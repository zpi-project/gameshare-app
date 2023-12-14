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
  value: number;
}

interface SelectInputProps {
  options: Option[];
  placeholder: string;
  noResultsInfo: string;
  onChange: (value: number[]) => void;
  search?: boolean;
  scroll?: boolean;
  width?: string;
  disabled?: boolean;
  clearValueOnChange?: boolean;
}

const SelectCategory: FC<SelectInputProps> = ({
  options,
  placeholder,
  noResultsInfo,
  onChange,
  search,
  scroll,
  width,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [valuesIDs, setValuesIDs] = useState<number[]>([]);

  const onSelect = (currentValue: string) => {
    const optionId = options.findIndex(option => option.label.toLowerCase() === currentValue);
    const valueId = options[optionId].value;

    if (values.includes(currentValue)) {
      setValues(values.filter(value => value !== currentValue));
      const newValuesIDs = valuesIDs.filter(value => value && value == valueId);
      setValuesIDs(newValuesIDs);
      onChange(newValuesIDs);
    } else {
      setValues([...values, currentValue]);
      const newValuesIDs = [...valuesIDs, valueId];
      setValuesIDs(newValuesIDs);
      onChange(newValuesIDs);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-[200px] justify-between bg-card leading-none", width)}
        >
          {placeholder}
          <ChevronDown className={open ? "rotate-180" : ""} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", width)}>
        <ScrollArea className={scroll ? "h-[300px]" : ""}>
          <Command>
            {search && <CommandInput placeholder="Search..." className="h-9" />}
            <CommandEmpty>{noResultsInfo}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value as unknown as string}
                  onSelect={onSelect}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      values.includes(option.label.toLowerCase()) ? "opacity-100" : "opacity-0",
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

export default SelectCategory;
