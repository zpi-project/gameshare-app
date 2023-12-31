import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "@/api/CategoryApi";
import CategoryCard from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const CategoriesSection: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", { language }],
    queryFn: CategoryApi.getAll,
    onError: () => {
      toast({
        title: t("categoriesErrorTitle"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
    },
  });

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h2 className="text-3xl leading-loose text-primary">{t("seeAll")}</h2>
      <div className="flex w-full flex-row flex-wrap gap-6">
        {isLoading ? (
          <>
            {Array.from({ length: 16 }).map((_, idx) => (
              <Skeleton className="h-48 w-48 rounded-lg" key={idx} />
            ))}
          </>
        ) : isError ? (
          <h3 className="text-xl text-destructive">{t("categoriesErrorTitle")}</h3>
        ) : (
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
