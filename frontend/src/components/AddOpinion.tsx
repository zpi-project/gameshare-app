import { FC } from "react";
import { Textarea } from "@/components/ui/textarea"
import Stars from "./Stars";

interface Props {}


 
const AddOpinion: FC<Props> = () => {
    

  return (
    <div className="grid w-full gap-2 p-2">
        <Stars/>
      {/* <Textarea placeholder="Type your message here." id="message-2" /> */}
    </div>
  )
}

export default AddOpinion;
