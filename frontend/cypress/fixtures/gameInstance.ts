import { GameInstance, GameInstanceDetails } from "@/types/GameInstance";
import { Paginated } from "@/types/Paginated";

export const paginatedGameInstances: Paginated<GameInstance> = {
  results: [
    {
      uuid: "5077a5ba-3b6b-4190-bf01-4e4de462bc50",
      description: "opis poprawiony NA NOWO",
      pricePerDay: 55,
      game: {
        id: 0,
        image:
          "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDP g70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg",
        name: "Brass: Birmingham",
        shortDescription:
          "Brass: Birmingham is an economic strategy game set in Birmingham during the .",
        minPlayers: 2,
        maxPlayers: 4,
        playingTime: 120,
        age: 14,
        categories: [],
      },
      avgRating: 2,
      opinionsAmount: 1,
      active: true,
    },
    {
      uuid: "dcc3a74e-57ad-4782-8443-d1d9d425aa03",
      description: "opis bedzie poprawion",
      pricePerDay: 11,
      game: {
        id: 2,
        image:
          "https://cf.geekdo-images.com/sZYp_3BTDGjh2una ZfZmuA__original/img/7d-lj5Gd1e8PFnD97LYFah2c45M=/0x0/filters:format(jpeg)/pic2437871.jpg",
        name: "Gloomhaven",
        shortDescription:
          "Gloomhaven is a tactical combat game set in a persistent world where players.",
        minPlayers: 1,
        maxPlayers: 4,
        playingTime: 120,
        age: 14,
        categories: [],
      },
      avgRating: 0,
      opinionsAmount: 0,
      active: true,
    },
  ],
  paginationInfo: {
    totalElements: 2,
    totalPages: 1,
  },
};

export const paginatedNoActiveGameInstances: Paginated<GameInstance> = {
  results: [
    {
      uuid: "5077a5ba-3b6b-4190-bf01-4e4de462bc50",
      description: "opis poprawiony NA NOWO",
      pricePerDay: 55,
      game: {
        id: 0,
        image:
          "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDP g70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg",
        name: "Brass: Birmingham",
        shortDescription:
          "Brass: Birmingham is an economic strategy game set in Birmingham during the .",
        minPlayers: 2,
        maxPlayers: 4,
        playingTime: 120,
        age: 14,
        categories: [],
      },
      avgRating: 0,
      opinionsAmount: 0,
      active: false,
    },
  ],
  paginationInfo: {
    totalElements: 2,
    totalPages: 1,
  },
};

export const paginatedNoGameInstances: Paginated<GameInstance> = {
  paginationInfo: {
    totalElements: 0,
    totalPages: 0,
  },
  results: [],
};

export const gameInstanceDetails: GameInstanceDetails = {
  uuid: "dcc3a74e-57ad-4782-8443-d1d9d425aa03",
  description: "opis bedzie poprawion",
  pricePerDay: 11,
  game: {
    id: 2,
    image:
      "https://cf.geekdo-images.com/sZYp_3BTDGjh2una ZfZmuA__original/img/7d-lj5Gd1e8PFnD97LYFah2c45M=/0x0/filters:format(jpeg)/pic2437871.jpg",
    name: "Gloomhaven",
    shortDescription:
      "Gloomhaven is a tactical combat game set in a persistent world where players take on the role of adventurers exploring dungeons and ruins. It features a cooperative gameplay with a unique card system for determining actions. Players must strategize their card choices and make decisions that impact the evolving stor yline as they progress through the game.",
    minPlayers: 1,
    maxPlayers: 4,
    playingTime: 120,
    age: 14,
    categories: [],
  },
  avgRating: 0,
  opinionsAmount: 0,
  images: [
    {
      id: 9,
      name: "maria/images-LJGSLx.jpg",
      link: "https://storage.googleapis.com/game-pictures-bucket/maria/images-LJGSLx.jpg",
    },
    {
      id: 10,
      name: "maria/good-t8BJm3.jpg",
      link: "https://storage.googleapis.com/game-pictures-bucket/maria/good-t8BJm3.jpg",
    },
  ],
  owner: {
    uuid: "0cebb605-2d22-4425-b2ae-915804291b07",
    firstName: "Maria",
    lastName: "Markowiak",
    locationLatitude: 51.09423770060308,
    locationLongitude: 17.064471244812015,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocKHmJl7NEQj-dMuBYDhAoaV7fKWUcYjVHsiH1nSnEQGuxo=s96-c",
    avgRating: 2,
    opinionsAmount: 1,
  },
  active: true,
};
