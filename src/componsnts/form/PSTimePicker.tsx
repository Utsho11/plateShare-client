import { TimeInput } from "@nextui-org/date-input";
import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function PSTimePicker({
  label,
  name,
  variant = "bordered",
}: IProps) {
  return (
    <Controller
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, ...fields } }) => (
        <TimeInput
          hourCycle={24}
          label={label}
          variant={variant}
          {...fields}
          className="min-w-full sm:min-w-[225px]"
        />
      )}
    />
  );
}
