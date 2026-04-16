import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

interface DetailPageDropdownProps {
  title: string;
  content: string;
}

export default function DetailPageDropdown({
  title,
  content,
}: DetailPageDropdownProps) {
  return (
    <Collapsible className="pt-4 rounded group border-t border-b data-[state=open] transition-all">
      <CollapsibleTrigger className="flex items-center w-full justify-between hover:cursor-pointer">
        <h2 className="text-md font-bold mb-4">{title}</h2>
        <ChevronDownIcon className="transition-transform mb-4 group-data-[state=open]:rotate-180"></ChevronDownIcon>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="text-left mb-4">{content}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
