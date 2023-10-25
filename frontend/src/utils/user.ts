import { User } from "@/types/User";

export const getFullname = ({ firstName, lastName }: User) => `${firstName} ${lastName}`;

export const getNameFirstLetters = ({ firstName, lastName }: User) =>
  `${firstName[0] || ""}${lastName[0] || ""}`;

export const hasName = ({ firstName, lastName }: User) => firstName.length + lastName.length > 0;
