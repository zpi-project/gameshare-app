import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "@/api/CategoryApi";
import CategoryCard from "@/components/CategoryCard";

const CategoriesSection: FC = () => {
  const { t } = useTranslation();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryApi.getAll,
  });

  return (
    <div>
      <h2 className="text-3xl leading-loose text-primary">{t("seeAll")}</h2>
      <div className="flex w-full flex-row flex-wrap gap-6">
        {isLoading && <></>}
        {categories && (
          <>
            {categories.map(category => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
