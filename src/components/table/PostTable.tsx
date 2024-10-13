"use client";

import { Chip } from "@nextui-org/chip";
import {
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { ChipVariantProps } from "@nextui-org/theme";
import { User } from "@nextui-org/user";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";

import {
  ChevronDownIcon,
  RecipeBlockIcon,
  RecipePublishIcon,
  SearchIcon,
  TrashIcon,
} from "../icons";

import { capitalize } from "@/src/utils/user.utils";
import { TRecipe } from "@/src/types";
import {
  recipeColumns,
  recipeStatusOptions,
  typeOptions,
} from "@/src/constants";
import {
  useDeleteRecipeIntoDB,
  useUpdateRecipeStatusIntoDB,
} from "@/src/hooks/recipe.hook";

const statusColorMap: Record<string, ChipVariantProps["color"]> = {
  PUBLISH: "success",
  BLOCK: "danger",
};
const typeColorMap: Record<string, ChipVariantProps["color"]> = {
  PREMIUM: "warning",
  FREE: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "type", "status", "actions"];

export const PostTable = ({ recipies }: { recipies: TRecipe[] }) => {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [typeFilter, setRoleFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const { mutate: changeRecipeStatus } = useUpdateRecipeStatusIntoDB();
  const { mutate: deleteRecipe } = useDeleteRecipeIntoDB();

  const handleDeleteRecipe = (id: string) => {
    console.log(id);
    deleteRecipe(id);
  };
  const handleRecipeStatus = (id: string, status: string) => {
    const data = {
      recipeId: id,
      recipeStatus: status,
    };

    changeRecipeStatus(data);
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return recipeColumns;

    return recipeColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...recipies];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((recipe) =>
        recipe.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== recipeStatusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((recipe) =>
        Array.from(statusFilter).includes(recipe.recipeStatus),
      );
    }
    if (
      typeFilter !== "all" &&
      Array.from(typeFilter).length !== typeOptions.length
    ) {
      filteredUsers = filteredUsers.filter((recipe) =>
        Array.from(typeFilter).includes(recipe.recipeType),
      );
    }

    return filteredUsers;
  }, [recipies, filterValue, statusFilter, typeFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: TRecipe, b: TRecipe) => {
      const first = a[
        sortDescriptor.column as keyof TRecipe
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof TRecipe
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((recipe: TRecipe, columnKey: React.Key) => {
    const cellValue = recipe[columnKey as keyof TRecipe];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: recipe.images![0] }}
            description={recipe.email}
            name={cellValue}
          >
            {recipe.email}
          </User>
        );
      case "type":
        return (
          <Chip
            className="capitalize"
            color={typeColorMap[recipe.recipeType]}
            size="sm"
            variant="flat"
          >
            {recipe.recipeType}
          </Chip>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[recipe.recipeStatus]}
            size="sm"
            variant="flat"
          >
            {recipe.recipeStatus}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            {recipe.recipeStatus === "PUBLISH" ? (
              <Tooltip content="Block Recipe">
                <Button
                  isIconOnly
                  className="bg-transparent"
                  onClick={() => handleRecipeStatus(recipe._id, "BLOCK")}
                >
                  <RecipeBlockIcon size={20} />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip content="Publish Recipe">
                <Button
                  isIconOnly
                  className="bg-transparent"
                  onClick={() => handleRecipeStatus(recipe._id, "PUBLISH")}
                >
                  <RecipePublishIcon size={20} />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="Delete Recipe">
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => handleDeleteRecipe(recipe._id)}
              >
                <TrashIcon size={20} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {recipeStatusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {typeOptions.map((type) => (
                  <DropdownItem key={type.uid} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {recipeColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {recipies.length} recipies
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    typeFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    recipies.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No recipies found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
