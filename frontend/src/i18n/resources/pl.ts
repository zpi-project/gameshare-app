import en from "./en";

const pl: typeof en = {
  myProfile: "Mój profil",
  login: "Zaloguj",
  logout: "Wyloguj",
  loading: "Ładowanie",

  mode: "Motyw",
  dark: "Ciemny",
  light: "Jasny",
  system: "Systemowy",

  language: "Język",
  pl: "polski",
  enUS: "angielski",

  addOpinion: "Dodaj opinię",
  seeMore: "Rozwiń",
  seeLess: "Zwiń",
  edit: "Edytuj",

  locationDisabledTooltip: "Włącz opcję lokalizacji w przeglądarce i odśwież stronę.",
  locationNotAvailableTooltip: "Twoja przeglądarka internetowa nie wspiera opcji lokalizacji",

  fillInPersonalData: "Podaj swoje dane osobowe",
  editPersonalData: "Edytuj swoje dane osobowe",
  markLocation: "Zaznacz swoją lokalizację na mapie",
  editLocation: "Edytuj swoją lokalizację na mapie",
  submit: "Zapisz",
  firstName: "Imię",
  lastName: "Nazwisko",
  phoneNumber: "Nr telefonu",

  fieldIsRequired: "{{field}} jest wymagane.",
  fieldIsRequired_male: "{{field}} jest wymagany.",
  fieldIsRequired_female: "{{field}} jest wymagana.",
  phoneNumberIsInvalid: "Numer telefonu jest nieprawidłowy.",

  gameDescription: "Opis gry",

  tryRefreshing: "Spróbuj odświeżyć stronę.",
  userErrorTitle: "Błąd",
  userErrorDescription: "Użytkownik z danym ID nie istnieje.",
  settingsErrorTitle: "Błąd",
  settingsErrorDescription: "Nie udało nam się załadować Twoich danych.",
  registerErrorTitle: "Wystąpił błąd podczas zapisywania twoich danych.",
  updateErrorTitle: "Wystąpił błąd podczas zapisywania twoich nowych danych.",
  registerSuccessDescription: "Pomyślnie zapisano twoje dane.",
  updateSuccessDescription: "Pomyślnie zapisano twoje nowe dane.",
  opinionSuccessDescription: "Pomyślnie zapisano twoją opinie.",
  opinionErrorTitle: "Wystąpił błąd podczas zapisywania twojej opinii.",
  saveOpinion: "Zapisz opinie",
  game: "Gra",

  welcomeHeader: "Witaj w GameShare!",
  welcomeDescription:
    "Cieszymy się, że jesteś z nami. Aby ułatwić twoje korzystanie z aplikacji, prosimy o chwilę Twojego czasu, aby dostarczyć nam niezbędne dane osobowe. Zacznijmy!",

  userGames: "Gry użytkownika",
  myGames: "Moje gry",
  addGameInstance: "Dodaj swoją grę",
  popularNow: "Popularne teraz",
  seeAll: "Zobacz wszystkie",
  popularGamesErrorTitle: "Nie udało się pobrać popularnych gier.",
  categoriesErrorTitle: "Nie udało się pobrać kategorii gier.",
  searchGamePlaceholder: "W jaką grę planszową chcesz zagrać?",
  searchGameWithinCategoryPlaceholder: "Wyszukaj grę w tej kategorii...",
  searchGamesError: "Wystąpił błąd podczas wyszukiwania gier.",
  noResults: "Brak wyników",
  categoryGamesError: "Nie udało się pobrać gier dla tej kategorii.",
  categoryError: "Nie udało się pobrać tej kategorii.",
  gameError: "Nie udało się pobrać danych o tej grze.",

  gameInstances: "Egzemplarze tej gry",
  noGamesMyPage: "Nie posiadasz jeszcze żadnej gry",
  noGamesUserPage: "Ten użytkownik nie posiada jeszcze żadnych gier",
  errorFetchingGames: "Wystąpił błąd podczas pobierania gier.",
  seeProfile: "Zobacz profil",
  seeAvailability: "Zobacz dostępność",
  seeGamePage: "Zobacz stronę gry",
  noOpinionsMyPage: "Nie posiadasz jeszcze żadnych opinii",
  noOpinionsUserPage: "Ten użytkownik nie posiada jeszcze żadnych opinii",
  errorFetchingOpinions: "Wystąpił błąd podczas pobierania opinii",
  deactivated: "nieaktywna",
  noGameInstances: "Nie znaleziono żadnych gier",
  errorFetchingUsersOnMap: "Wystąpił błąd podczas pobierania użytkowników.",

  noGameUsers: "Nikt jeszcze nie ma tej gry",
  errorFetchingGameInstances: "Nie udało się pobrać egzemplarzy tej gry",
  errorAddingGame: "Nie udało się dodać nowej gry.",
  errorAddingImage: "Wystąpił błąd podczas dodawania zdjęcia nr {{nr}}.",
  successAddingImage: "Zdjęcie nr {{nr}} zostało dodane pomyślnie.",
  errorAddingImageDescription: "Zdjęcie nie zostało dodane.",
  incorrectFileType: "Nieprawidłowy typ pliku Dozwolone typy  to JPG, JPEG, PNG.",
  tryAgain: "Nie udało się dodać gry. Proszę spróbuj ponownie",
  gameInstanceAdded: "Egzemplarz gry został dodany.",
  gameInstanceDescriptionMin: "Opis musi mieć przynajmniej 2 znaki.",
  gameInstanceDescriptionMax: "Opis musi mieć maksymalnie 500 znaków",
  minPricePerDay: "Cena musi być przynajmniej 0",
  maxPricePerDay: "Maksymalna cena to 200",
  yourGameDetails: "Informacje o twojej grze",
  provideGamePrice: "Podaj cenę swojego egzemplarza gry",
  typeHere: "Wpisz tutaj...",
  addGameDesc: "Dodaj opis swojej gry",
  chooseGameTitle: "Wybierz tytuł gry",
  uploadGamePhotos: "Dodaj zdjęcia swojej gry",
  noOpinionsGameInstance: "Ten egzemplarz nie ma jeszcze żadnej opinii",
  gameInstaneDescriptionMin: "Opis gry musi mieć min 2 znaki.",
  typeToSearch: "Wyszukaj grę...",
  category: "Kategoria",
  all: "Wszystkie",
  pricePerDay: "Cena za dzień",
  players: "Liczba graczy",
  age: "Wiek",
  perDay: "na dzień",

  any: "Dowolne",
  any_male: "Dowolny",
  any_female: "Dowolna",

  myReservations: "Moje rezerwacje",
  reservationStatus: "Status rezerwacji",
  reservationType: "Typ rezerwacji",
  errorFetchingReservations: "Wystąpił błąd podczas pobierania twoich rezerwacji.",
  noReservations: "Nie masz żadnych rezerwacji",
  noReservationsStatus: "Nie masz żadnych rezerwacji o takim statusie",
  reservationNumber: "Numer rezerwacji:",
  startDate: "Od:",
  endDate: "Do:",
  days: "Dni:",
  dateFormat: "{{date, d MMM. yyyy}}",
  monthYearFormat: "{{date, MMM. yyyy}}",

  reservationTypes: {
    owner: "Jako właściciel",
    renter: "Jako wypożyczający",
  },

  reservationStatuses: {
    owner: {
      ALL: "Wszystkie",
      PENDING: "Oczekujące na akceptację",
      ACCEPTED_BY_OWNER: "Zaakceptowane przeze mnie",
      REJECTED_BY_OWNER: "Odrzucone przeze mnie",
      CANCELED_BY_OWNER: "Anulowane przeze mnie",
      CANCELED_BY_RENTER: "Anulowane przez wypożyczającego",
      RENTED: "Wypożyczone",
      FINISHED: "Zrealizowane",
      EXPIRED: "Po terminie",
    },
    renter: {
      ALL: "Wszystkie",
      PENDING: "Oczekujące na akceptację",
      ACCEPTED_BY_OWNER: "Zaakceptowane przez właściciela",
      REJECTED_BY_OWNER: "Odrzucone przez właściciela",
      CANCELED_BY_OWNER: "Anulowane przez właściciela",
      CANCELED_BY_RENTER: "Anulowane przeze mnie",
      RENTED: "Wypożyczone",
      FINISHED: "Zrealizowane",
      EXPIRED: "Po terminie",
    },
  },

  weekdays: {
    0: "pon",
    1: "wt",
    2: "śr",
    3: "czw",
    4: "pt",
    5: "so",
    6: "nie",
  },

  reservationsCalendar: "Kalendarz rezerwacji",
  availabilityCalendar: "Kalendarz dostępności",
  reservationForm: "Formularz rezerwacji",
  deactivate: "Dezaktywuj",
  activate: "Aktywuj",
  bookItNow: "Rezerwuj",
  errorFetchingReservationsCalendar: "Nie udało się pobrać rezerwacji na ten miesiąc.",
  errorStatus: {
    "400": "Nieprawidłowe zapytanie",
    "401": "Nieautoryzowany dostęp",
    "403": "Zabroniony",
    "404": "Szukana strona nie istnieje",
    "500": "Wewnętrzny błąd serwera",
    "501": "Nie zaimplementowano",
    "503": "Usługa niedostępna",
    "504": "Przekroczono czas oczekiwania",
  },

  unexpectedError: "Wystąpił niespodziewany błąd.",
  ooops: "Ooops!",
  backToHome: "Wróć na stronę główną",
  error: "Błąd",
  leaveMessage: "Zostaw wiadomość dla właściciela gry...",
  formStartDate: "Data początkowa",
  formEndDate: "Data końcowa",
  pickDate: "Wybierz datę",
  startDateNotPast: "Data początkowa nie może być przeszła.",
  endDateAtLeastStartDate: "Data do musi być późniejsza niż data od.",
  createReservationSuccess: "Gra została pomyślnie zarezerwowana!",
  createReservationSuccessDescription:
    "Wysłaliśmy maila do właściciela gry o twojej rezerwacji. Powiadomimy Cię o dalszym statusie rezerwacji.",
  createReservationError: "There was an error booking this game.",
  seeReservation: "Zobacz szczegóły rezerwacji",
  submitReservation: "Zarezerwuj",

  reservationDetails: {
    renter: {
      userDetails: "Właściciel - szczegóły",
      renterMessage: "Twoja wiadomość do rezerwacji:",
      renterNoMessage: "Nie zostawiłeś żadnej wiadomości do rezerwacji.",
      ownerOpinion: "Twoja opinia o właścicielu gry",
      renterOpinion: "Opinia właściciela gry o tobie",
      gameOpinion: "Twoja opinia o grze",
    },
    owner: {
      userDetails: "Wypożyczający - szczegóły",
      renterMessage: "Wiadomość od wypożyczającego:",
      renterNoMessage: "Wypożyczający nie zostawił żadnej wiadomości.",
      ownerOpinion: "Opinia wypożyczającego o tobie",
      renterOpinion: "Twoja opinia o wypożyczającym",
      gameOpinion: "Opinia wypożyczającego o twojej grze",
    },
  },

  reservationHeader: "rezerwacja - {{reservationId}} - szczegóły",
  status: "Status:",
  ownerNoOpinion: "Wypożyczający nie dodał opinii o tobie.",
  noGameOpinion: "Wypożyczający nie dodał opinii o twojej grze.",
  noRenterOpinion: "Właściciel gry nie dodał opinii o tobie.",
  ownerDetails: "Właściciel gry - szczegóły",
  gameDetails: "Gra - szczegóły",
  gameReservationsCalendar: "Kalendarz rezerwacji gry",
  userNoOpinions: "Użytkownik nie ma jeszcze żadnej opinii",
  cannotAddOpinionAboutOwner: "Nie możesz dodać jeszcze opinii o właścicielu gry.",
  cannotAddOpinionAboutRenter: "Nie możesz dodać jeszcze opinii o wypożyczającym.",
  cannotAddOpinionAboutGame: "Nie możesz dodać jeszcze opinii o tej grze.",
  noOpinions: "Brak opinii",
  successChangingStatus: "Status zmieniony pomyślnie",
  successChangingStatusDescription:
    "Aktualny status to - {{status}}. {{user}} otrzymał maila z potwierdzeniem zmiany statusu rezerwacji.",
  errorChangingStatus: "Wystąpił błąd podczas zmiany statusu.",
  errorChangingStatusDescription: "Nie zmieniono statusu.",
  owner: "Właściciel gry",
  renter: "Wypożyczający",
  errorFetchingDetails: "Nie udało się pobrać szczegółów rezerwacji {{reservationId}}",
  timeframeNoAvailable:
    "Nie możesz zarezerwować tej gry w tych datach, ponieważ ktoś już zarezerwował grę w przedziale czasu podanym przez ciebie.",
  timeframeAvailable:
    "Gra jest dostępna w podanym przez ciebie przedziale czasu. Możesz ją zarezerwować.",

  gameRequests: "Gry oczekujące na twoją akceptację",
  noGameRequests: "Aktualnie nie ma żadnych gier oczekujących na twoją akceptację.",
  gameRequestsError: "Nie udało się pobrać gier do akceptacji.",
  accept: "Akceptuj",
  reject: "Odrzuć",
  gameAcceptSuccess: "Gra - {{title}} - została zaakceptowana pomyślnie.",
  gameAcceptError: "Wystąpił błąd podczas akceptowania gry - {{title}}.",
  gameAcceptErrorDescription: "Gra nie została akceptowana.",
  gameRejectSuccess: "Gra - {{title}} została odrzucona.",
  gameRejectError: "Wystąpił błąd podczas odrzucania gry - {{title}}.",
  gameRejectErrorDescription: "Gra nie została odrzucona.",
  choosePictures: "Wybierz maksymalnie 3 pliki. Format: JPG, JPEG or PNG",
};

export default pl;
