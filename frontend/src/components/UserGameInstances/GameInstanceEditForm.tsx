import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image } from "@/types/Image";
import { GameInstanceApi } from "@/api/GameInstanceApi";
import { DialogContent } from "@/components/ui/dialog";
import Spinner from "../ui/Spinner";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";

interface GameEditFormProps {
  id: string;
  onClose: () => void;
}

const GameEditForm: FC<GameEditFormProps> = ({ id, onClose }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();
  const [images, setImages] = useState<(File | Image)[]>([]);

  const {
    data: gameInstance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gameInstance", { id, language }],
    queryFn: () => GameInstanceApi.getOne(id),
    onError: () => {
      toast({
        title: t("gameError"),
        description: t("tryRefreshing"),
        variant: "destructive",
      });
      onClose();
    },
    onSuccess: data => {
      setImages(data.images);
    },
  });

  const { mutateAsync: addImage, isLoading: isLoadingAddImage } = useMutation(
    (params: { uuid: string; file: File }) => GameInstanceApi.addImage(params.uuid, params.file),
  );

  const { mutateAsync: deleteImage, isLoading: isLoadingDeleteImage } = useMutation(uuid =>
    GameInstanceApi.deleteImage(uuid),
  );

  return (
    <DialogContent>
      <Form>{isLoading && <Spinner />}</Form>
    </DialogContent>
  );
};

export default GameEditForm;
