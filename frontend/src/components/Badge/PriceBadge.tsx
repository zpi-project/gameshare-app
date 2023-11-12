import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PriceBadgeProps {
  price: number;
}

const PriceBadge: FC<PriceBadgeProps> = ({ price }) => {
  const { t } = useTranslation();

  return (
    <Badge className="flex w-max flex-row gap-1">
      <Coins size={20} />
      <span className="tracking-wider">
        {price} / {t("perDay")}
      </span>
    </Badge>
  );
};

export default PriceBadge;
