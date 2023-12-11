import { LOREM } from "@/constants/lorem";
import { Opinion } from "@/types/Opinion";
import { Paginated } from "@/types/Paginated";

export const opinion: Opinion = {
  id: 2,
  timestamp: "2023-12-04T20:01:51.970+00:00",
  stars: 2,
  description: "opinion about user",
  ratingUser: {
    uuid: "0cebb605-2d22-4425-b2ae-915804291b07",
    firstName: "Amy",
    lastName: "Smith",
    locationLatitude: 51.09423770060308,
    locationLongitude: 17.064471244812015,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocKHmJl7NEQj-dMuBYDhAoaV7fKWUcYjVHsiH1nSnEQGuxo=s96-c",
    avgRating: 2,
    opinionsAmount: 1,
  },
};

export const opinionLong: Opinion = {
  ...opinion,
  description: LOREM,
};

export const paginatedOpinions: Paginated<Opinion> = {
  paginationInfo: {
    totalElements: 3,
    totalPages: 1,
  },
  results: [opinion, opinion, opinion],
};

export const paginatedNoOpinions: Paginated<Opinion> = {
  paginationInfo: {
    totalElements: 0,
    totalPages: 0,
  },
  results: [],
};
