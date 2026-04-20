import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiInfo } from "react-icons/fi";

export function PopoverPhone() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FiInfo className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <p className="text-muted-foreground text-sm">
          In case we need to contact you about your order
        </p>
      </PopoverContent>
    </Popover>
  );
}
