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

  gameDescription: "Game description",

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
  recommendationsErrorTitle: "We couldn't load recommendations for you",
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
  seeProfile: "See profile",
  seeAvailability: "See availability",
  seeGamePage: "See game page",
  noOpinionsMyPage: "You don't have any opinions yet",
  noOpinionsUserPage: "This user doesn't have any opinions yet",
  errorFetchingOpinions: "There was an error when fetching opinions",
  errorFetchingGames: "There was an error fetching games.",
  deactivated: "deactivated",
  noGameInstances: "We couldn't find any games",
  errorFetchingUsersOnMap: "There was an error fetching users on map.",
  noGameUsers: "No one has this game yet",
  errorFetchingGameInstances: "We couldn't load copies of this game",
  noOpinionsGameInstance: "This game instance doesn't have any opinions yet",
  gameInstaneDescriptionMin: "The description must be a minimum of 2 characters in length.",

  typeToSearch: "Type to search...",
  category: "Category",
  all: "All",
  pricePerDay: "Price per day",
  players: "Players",
  age: "Age",
  perDay: "day",
  errorAddingGame: "There was an error adding a new game.",
  errorAddingImage: "There was an error adding image nr {{nr}}.",
  errorAddingImageDescription: "Image was not added.",
  incorrectFileType: "Incorrect file type. Allowed file types: PNG, JPG, JPEG.",
  successAddingImage: "Image nr {{nr}} was added successfully.",
  tryAgain: "Something went wrong. Please try again.",
  gameInstanceAdded: "Game istance was addedd successfully.",
  gameInstanceDescriptionMin: "Description must be at least 2 characters.",
  gameInstanceDescriptionMax: "Description must be less then 500 characters.",
  fieldPositive: "{{field}} must be greater than 0.",
  maxPricePerDay: "Price per day must be less than 200.",
  yourGameDetails: "Your game details",
  provideGamePrice: "Provide game instance price",
  typeHere: "Type here...",
  addGameDesc: "Add game description",
  chooseGameTitle: "Choose game title",
  uploadGamePhotos: "upload your game photos",
  game: "Game",

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
  monthYearFormat: "{{date, MMMM yyyy}}",

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

  weekdays: {
    0: "mon",
    1: "tue",
    2: "wed",
    3: "thu",
    4: "fri",
    5: "sat",
    6: "sun",
  },

  reservationsCalendar: "Reservations calendar",
  availabilityCalendar: "Availability calendar",
  reservationForm: "Reservation form",
  bookItNow: "Book it now",
  deactivate: "Deactivate",
  activate: "Activate",
  errorFetchingReservationsCalendar: "We couldn't fetch reservations for this month.",
  errorStatus: {
    "400": "Bad Request",
    "401": "Unauthorized Access",
    "403": "Forbidden",
    "404": "We couldn't find the page you are looking for",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
  },
  unexpectedError: "There was an unexpected error.",
  ooops: "Ooops!",
  backToHome: "Back to home",
  error: "Error",
  leaveMessage: "Leave a message for the game owner...",
  formStartDate: "Start date",
  formEndDate: "End date",
  pickDate: "Pick a date",
  startDateNotPast: "Start date cannot be a past date or today.",
  endDateAtLeastStartDate: "End date cannot be earlier than start date.",
  createReservationSuccess: "Game has been booked successfully!",
  createReservationSuccessDescription:
    "We've sent an email to the game owner and we will notify you when he reacts to your reservation.",
  createReservationError: "There was an error booking this game.",
  seeReservation: "See reservation details",
  submitReservation: "Submit",

  reservationDetails: {
    renter: {
      userDetails: "Owner - details",
      renterMessage: "Message left by you:",
      renterNoMessage: "You hasn't left any message for owner.",
      ownerOpinion: "Your opinion about owner",
      renterOpinion: "Owner's opininon about you",
      gameOpinion: "Your opinion about owner's game",
    },
    owner: {
      userDetails: "Renter - details",
      renterMessage: "Message left by renter:",
      renterNoMessage: "Renter hasn't left any message for you.",
      ownerOpinion: "Renter's opinion about you",
      renterOpinion: "Your opinion about renter",
      gameOpinion: "Renter's opinion about your game",
    },
  },

  reservationHeader: "reservation - {{reservationId}} - details",
  status: "Status:",
  ownerNoOpinion: "Renter hasn't added an opinion about you yet.",
  noGameOpinion: "Renter hasn't added an opinion about your game yet.",
  noRenterOpinion: "Owner hasn't added an opinion about you yet.",
  ownerDetails: "Owner - details",
  gameDetails: "Game - details",
  gameReservationsCalendar: "Game reservations calendar",
  userNoOpinions: "This user has no opinions yet",
  cannotAddOpinionAboutOwner: "You cannot add opinion about the owner now.",
  cannotAddOpinionAboutRenter: "You cannot add opinion about this renter now.",
  cannotAddOpinionAboutGame: "You cannot add opinion about the game now.",
  noOpinions: "No opinions",
  successChangingStatus: "Status was changed successfully",
  successChangingStatusDescription:
    "Current status is - {{status}}. {{user}} has received an email with new status change confirmation.",
  errorChangingStatus: "There was an error changing status.",
  errorChangingStatusDescription: "Status has not been changed.",
  renter: "Renter",
  owner: "Game owner",
  errorFetchingDetails: "There was an error fetching details about reservation {{reservationId}}",
  timeframeNoAvailable:
    "You cannot book this game on these dates because someone has already reserved the game within the time range you specified.",
  timeframeAvailable:
    "These dates are available, you can book this game within the time range you specified",

  gameRequests: "Games awaiting for your acceptation",
  noGameRequests: "Currently there are no games awaiting or your acceptation.",
  gameRequestsError: "We couldn't fetch games awaiting for acceptation.",
  accept: "Accept",
  reject: "Reject",
  gameAcceptSuccess: "Game - {{title}} - has been accepted successfully.",
  gameAcceptError: "There was an error accepting game - {{title}}.",
  gameAcceptErrorDescription: "Game has been not accepted.",

  gameRejectSuccess: "Game - {{title}} has been rejected.",
  gameRejectError: "There was an error rejecting game - {{title}}.",
  gameRejectErrorDescription: "Game has been not rejected.",
  recommendedGames: "Recommended for you",
  choosePictures: "Choose up to 3 files. Format: JPG, JPEG or PNG",
  cannotFindGame:
    "If you cannot find the game you are looking for, you can make a new game request and await for one of our admins to accept it.",
  addGame: "Add new game",

  gameName: "Game name",
  maxCharCount: "{{field}} can be of max length {{length}} characters.",
  uploadGamePhoto: "Upload game photo",
  choosePicture: "Choose 1 file. Format: JPG, JPEG or PNG",
  filGameDetails: "Fill in details about a new game",
  minPlayers: "Min number of players",
  maxPlayers: "Max number of players",
  playingTime: "Playing time",
  categories: "Categories",
  chooseCategories: "Choose categories",
  numberTypeError: "{{field}} has to be a number.",
  intTypeError: "{{field}} has to be an integer.",
  maxImgSize: "Max image size is {{size}}MB",
  gameAlreadyExists: "Game with this name already exists.",
  errorAddingNewGame: "There was an error adding this game.",
  successAddingNewGame: "A request to add a new game was sent to admin.",
  successAddingNewGameAdmin: "New game was successfully added.",
  successAddingSingleImage: "Image has been added successfully.",
  errorAddingSingleImage: "There was an error adding image.",
  errorDeletingImage: "There was an error deleting image.",
  successDeteletingImage: "The image has been deleted successfully.",
  successEditingGameInstance: "Game was edited successfully.",
  editGameData: "Edit your game details",
  updateImages: "Update images",
};
