import { FC, useEffect } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  removeAllOnUnmount?: boolean;
}

export const Toaster: FC<Props> = ({ removeAllOnUnmount }) => {
  const { toasts, removeAll } = useToast();

  useEffect(() => {
    if (removeAllOnUnmount) {
      return removeAll;
    }
  }, [removeAll, removeAllOnUnmount]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
