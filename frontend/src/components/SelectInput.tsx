import { FC, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  options: Option[];
  placeholder: string;
  noResultsInfo: string;
}

const SelectInput: FC<SelectInputProps> = ({ options, placeholder, noResultsInfo }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-card leading-none"
        >
          {value
            ? options.find(option => {
                return option.label.toLowerCase() == value;
              })?.label
            : placeholder}
          <ChevronDown className={open ? "rotate-180" : ""} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea className="h-[300px]">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandEmpty>{noResultsInfo}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value as string}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.label.toLowerCase() ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default SelectInput;
