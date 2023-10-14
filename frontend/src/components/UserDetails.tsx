import { FC } from "react";

interface Props {
  showButton?: boolean;
  onClick?: () => void;
}

const UserDetails: FC<Props> = ({ showButton, onClick }) => {
  return (
    <div>
      <div>user details section</div>
      {showButton ? <button onClick={onClick}>edit and open edit modal</button> : <></>}
    </div>
  );
};

export default UserDetails;
