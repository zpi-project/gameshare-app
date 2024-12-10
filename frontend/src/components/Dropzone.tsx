import React, { ChangeEvent, ReactNode, useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Input } from "./ui/input";

interface DropzoneProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  classNameWrapper?: string;
  className?: string;
  dropMessage: ReactNode;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
  icon?: ReactNode;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, classNameWrapper, dropMessage, handleOnDrop, icon, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 dark:border-muted-foreground/10 dark:hover:border-muted-foreground/50",
          classNameWrapper,
        )}
      >
        <div
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          {icon ? icon : <Upload className="text-muted-foreground" />}
          <span className="text-base text-muted-foreground" data-test="drop-message">
            {dropMessage}
          </span>
          <Input
            {...props}
            ref={inputRef}
            value={undefined}
            type="file"
            data-test="file-input"
            className={cn("hidden", className)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnDrop(e.target.files)}
          />
        </div>
      </div>
    );
  },
);
Dropzone.displayName = "Dropzone";

export default Dropzone;
