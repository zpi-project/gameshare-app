import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VideoTutorial from "../VideoTutorial";

const Help: FC = () => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          data-test="mode-toggle"
          className="w-[40px] w-full min-w-[40px] border-[#428ccd] font-normal text-[#428ccd]"
        >
          <HelpCircle strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px] bg-section p-3">
        <DropdownMenuItem className="px-4 text-base" asChild>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/1JfyPjFISbPiEj_1W1FNuic0KlevpJJdqeT90v7yv-6M/edit?usp=sharing"
            className="text-base"
          >
            {t("userManual")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 text-base" asChild>
          <a
            href="mailto:support@example.com?subject=Support%20Request&body=Please%20describe%20your%20issue."
            className="text-base"
          >
            {t("contactUs")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full px-4 text-base" asChild>
          <VideoTutorial />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Help;
