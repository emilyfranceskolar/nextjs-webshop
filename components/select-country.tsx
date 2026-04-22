import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCountry() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Country/Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Sweden</SelectItem>
          <SelectItem value="banana">Norway</SelectItem>
          <SelectItem value="blueberry">Denmark</SelectItem>
          <SelectItem value="grapes">Finland</SelectItem>
          <SelectItem value="pineapple">Germany</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
