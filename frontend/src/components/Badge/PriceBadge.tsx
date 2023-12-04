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
    <Badge className="flex w-max flex-row gap-1" data-test="price-badge">
      <Coins size={20} data-test="coins-icon" />
      <span className="tracking-wider" data-test="price-info">
        {price} / {t("perDay")}
      </span>
    </Badge>
  );
};

export default PriceBadge;
