export const protectedRoutes = [
  "/profile",
  "/profile/:page*",
  "/admin",
  "/login",
  "/register",
];

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const recipeColumns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "ACTIVE" },
  { name: "Block", uid: "BLOCK" },
];

const recipeStatusOptions = [
  { name: "Publish", uid: "PUBLISH" },
  { name: "Block", uid: "BLOCK" },
];

const roleOptions = [
  { name: "User", uid: "USER" },
  { name: "Admin", uid: "ADMIN" },
  { name: "Premium", uid: "PREMIUM" },
];

const typeOptions = [
  { name: "free", uid: "FREE" },
  { name: "Premium", uid: "PREMIUM" },
];

export {
  columns,
  statusOptions,
  roleOptions,
  typeOptions,
  recipeStatusOptions,
  recipeColumns,
};
