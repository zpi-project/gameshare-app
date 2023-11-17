import { FC, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingGameDetailsSection: FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setWidthToHeight = () => {
      if (divRef.current) {
        const height = divRef.current.clientHeight;
        divRef.current.style.width = `${height}px`;
        divRef.current.style.minWidth = `${height}px`;
      }
    };

    setWidthToHeight();
    window.addEventListener("resize", setWidthToHeight);
    return () => {
      window.removeEventListener("resize", setWidthToHeight);
    };
  }, []);

  return (
    <>
      <div ref={divRef} className="h-full max-h-[320px] w-[265px]">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="flex flex-grow flex-col gap-2 lg:gap-4">
        <Skeleton className="h-10 max-w-[700px] rounded-lg" />
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-8 max-w-[100px] rounded-full" />
          <Skeleton className="h-8 max-w-[200px] rounded-full" />
          <Skeleton className="h-8 max-w-[350px] rounded-full" />
          <Skeleton className="h-8 max-w-[150px] rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 max-w-[900px] rounded-lg" />
          <Skeleton className="h-4 max-w-[1100px] rounded-lg" />
          <Skeleton className="h-4 max-w-[1200px] rounded-lg" />
          <Skeleton className="h-4 w-[800px] rounded-lg" />
        </div>
        <div className="mt-8 flex flex-wrap gap-1">
          <Skeleton className="h-8 max-w-[100px] rounded-full" />
          <Skeleton className="h-8 max-w-[100px] rounded-full" />
          <Skeleton className="h-8 max-w-[100px] rounded-full" />
        </div>
      </div>
    </>
  );
};

export default LoadingGameDetailsSection;
