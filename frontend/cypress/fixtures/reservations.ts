import { Paginated } from "@/types/Paginated";
import { Reservation, ReservationTimeframe } from "@/types/Reservation";

export const reservation: Reservation = {
  gameInstance: {
    uuid: "e8d60f0c-6920-4099-9cfe-0d0b8fefb78e",
    description: "my new game instance",
    pricePerDay: 9,
    game: {
      id: 1,
      name: "Brass: Birmingham",
      image:
        "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg",
      minPlayers: 2,
      maxPlayers: 4,
      playingTime: 120,
      age: 14,
      shortDescription: "",
      categories: [],
    },
    avgRating: 3.9,
    images: [
      {
        id: 1,
        name: "maria/game-8RPEr2.jpg",
        link: "https://storage.googleapis.com/game-pictures-bucket/maria/game-8RPEr2.jpg",
      },
    ],
    owner: {
      uuid: "d5f4e9f7-3c80-43fd-a5e9-cccff4c3445c",
      firstName: "Maria",
      lastName: "Owner",
      locationLatitude: 51.1087347,
      locationLongitude: 17.0570206,
      avatarLink:
        "https://lh3.googleusercontent.com/a/ACg8ocKHmJl7NEQj-dMuBYDhAoaV7fKWUcYjVHsiH1nSnEQGuxo=s96-c",
      avgRating: 2,
    },
    active: true,
  },
  id: 1,
  reservationId: "2023-12-234",
  renter: {
    uuid: "d5f4e9f7-3c80-43fd-a5e9-cccff4c3445c",
    firstName: "Maria",
    lastName: "Renter",
    locationLatitude: 51.1087347,
    locationLongitude: 17.0570206,
    avatarLink:
      "https://lh3.googleusercontent.com/a/ACg8ocKHmJl7NEQj-dMuBYDhAoaV7fKWUcYjVHsiH1nSnEQGuxo=s96-c",
    avgRating: 2,
  },
  startDate: "2023-12-22T12:30:00.000+00:00",
  endDate: "2023-12-24T12:30:00.000+00:00",
  status: {
    id: 7,
    status: "ACCEPTED_BY_OWNER",
  },
  renterComment: "I would really appreciate borrowing this game :)",
  timestamp: "2023-12-16T22:16:39.798+00:00",
  duration: 3,
};

export const reservationTimeframes: ReservationTimeframe[] = [
  {
    startDate: "",
    endDate: "",
    reservationId: "",
  },
];

export const reservations: Reservation[] = Array.from({ length: 30 }, () => reservation);

export const getPaginatedReservations = (page: number, size: number): Paginated<Reservation> => ({
  results: reservations.slice(page * size, (page + 1) * size),
  paginationInfo: {
    totalElements: reservations.length,
    totalPages: Math.ceil(reservations.length / size),
  },
});
