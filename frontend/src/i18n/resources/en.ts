export default {
  myProfile: "My profile",
  login: "Log in",
  logout: "Log out",
  loading: "Loading",

  mode: "Mode",
  dark: "Dark",
  light: "Light",
  system: "System",

  language: "Language",
  pl: "Polish",
  enUS: "English",

  addOpinion: "Add opinion",
  seeMore: "See more",
  seeLess: "See less",
  edit: "Edit",

  locationDisabledTooltip: "Allow localization in your browser settings and refresh page.",
  locationNotAvailableTooltip: "Your browser does not support Geolocation API.",

  fillInPersonalData: "Fill in your personal data",
  editPersonalData: "Edit your personal data",
  markLocation: "Mark your location on map",
  editLocation: "Edit your location on map",
  submit: "Submit",
  firstName: "First name",
  lastName: "Last name",
  phoneNumber: "Phone number",

  fieldIsRequired: "{{field}} is required.",
  fieldIsRequired_male: "{{field}} is required.",
  fieldIsRequired_female: "{{field}} is required.",
  phoneNumberIsInvalid: "Phone number is incorrect.",

  tryRefreshing: "Try refreshing this page.",
  userErrorTitle: "Error",
  userErrorDescription: "User with given ID doesn't exists.",
  settingsErrorTitle: "Error",
  settingsErrorDescription: "We couldn't load your user data.",
  registerErrorTitle: "An error occured while saving your data.",
  updateErrorTitle: "An error occured while saving your new data.",
  registerSuccessDescription: "Your data was saved successfully.",
  updateSuccessDescription: "Your new data was saved successfully.",

  welcomeHeader: "Welcome to GameShare!",
  welcomeDescription:
    "We're thrilled to have you on board. To enhance your gaming experience, please take a moment to provide us with some essential personal information. Let's get started!",

  userGames: "Games of user",
  myGames: "My games",
  addGameInstance: "Add your game",
  popularNow: "Popular now",
  seeAll: "See all",
  popularGamesErrorTitle: "We couldn't load popular games.",
  categoriesErrorTitle: "We couldn't load game categories.",
  searchGamePlaceholder: "What board game would you like to play?",
  searchGameWithinCategoryPlaceholder: "Search games within this category",
  searchGamesError: "There was an error while searching games.",
  noResults: "No results",
  categoryGamesError: "There was a problem fetching games within this category.",
  categoryError: "There was a problem fetching this category.",
  gameError: "There was a problem fetching this game.",
  gameInstances: "Copies of this game",
  noGamesMyPage: "You don't have any games yet",
  noGamesUserPage: "This user doesn't have any games yet",
  noOpinionsMyPage: "You don't have any opinions yet",
  noOpinionsUserPage: "This user doesn't have any opinions yet",
  errorFetchingOpinions: "There was an error when fetching opinions",
  errorFetchingGames: "There was an error fetching games.",
  deactivated: "DEACTIVATED",
  noGameInstances: "We couldn't find any games",
  errorFetchingUsersOnMap: "There was an error fetching users on map.",
  noGameUsers: "No one has this game yet",
  errorFetchingGameInstances: "We couldn't load copies of this game",

  typeToSearch: "Type to search...",
  category: "Category",
  all: "All",
  pricePerDay: "Price per day",
  players: "Players",
  age: "Age",
  perDay: "day",

  any: "Any",
  any_male: "Any",
  any_female: "Any",

  myReservations: "My reservations",
  reservationStatus: "Reservation status",
  reservationType: "Reservation type",
  errorFetchingReservations: "We couldn't load your reservations.",
  noReservations: "You don't have any reservations yet.",
  noReservationsStatus: "You don't have any reservations with this status.",
  reservationNumber: "Reservation number:",
  startDate: "Start date:",
  endDate: "End date:",
  days: "Days:",
  dateFormat: "{{date, MMM. d, yyyy}}",

  reservationTypes: {
    owner: "As game owner",
    renter: "As game renter",
  },

  reservationStatuses: {
    owner: {
      ALL: "All",
      PENDING: "Pending approval",
      ACCEPTED_BY_OWNER: "Accepted by me",
      REJECTED_BY_OWNER: "Rejected by me",
      CANCELED_BY_OWNER: "Canceled by me",
      CANCELED_BY_RENTER: "Canceled by renter",
      RENTED: "Rented",
      FINISHED: "Finished",
      EXPIRED: "Expired",
    },
    renter: {
      ALL: "All",
      PENDING: "Pending approval",
      ACCEPTED_BY_OWNER: "Accepted by owner",
      REJECTED_BY_OWNER: "Rejected by owner",
      CANCELED_BY_OWNER: "Canceled by owner",
      CANCELED_BY_RENTER: "Canceled by me",
      RENTED: "Rented",
      FINISHED: "Finished",
      EXPIRED: "Expired",
    },
  },
};
