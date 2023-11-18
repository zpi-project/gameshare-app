import { FC } from "react";
import { SendHorizontal } from "lucide-react";
import { User } from "@/types/User";
import { getFullname } from "@/utils/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "../Avatar";
import Stars from "../Stars/Stars";
import { Button } from "../ui/button";

interface Props {
  // onClick?: () => void;
  user?: User;
  isLoading: boolean;
}

const OpinionInput: FC<Props> = ({ user, isLoading }) => {
  return (
    <div className="flex w-full flex-row items-center gap-3 rounded-lg bg-card p-2">
      {isLoading && (
        <>
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-row justify-between">
              <Skeleton className="h-5 w-6/12 rounded-lg" />
              <Stars count={0} />
            </div>
            <div className="grid w-9/12 gap-2.5">
              <Textarea placeholder="Type your message here." id="message-2" />
            </div>
          </div>
        </>
      )}
      {user && (
        <>
          <Avatar user={user} className="h-16 w-16" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex flex-row justify-between p-1">
              <div className="text-primary">{getFullname(user)}</div>
              <Stars count={0} />
            </div>
            <div className="flex w-full flex-row justify-between gap-1">
              <div className="flex w-full">
                <Textarea placeholder="Type your message here." id="message-2" />
              </div>
              <div className="object-right-bottom">
                <Button className="w-12">
                  <SendHorizontal size={34} />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OpinionInput;
