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

  tryRefreshing: "Spróbuj odświeżyć stronę.",
  userErrorTitle: "Błąd",
  userErrorDescription: "Użytkownik z danym ID nie istnieje.",
  settingsErrorTitle: "Błąd",
  settingsErrorDescription: "Nie udało nam się załadować Twoich danych.",
  registerErrorTitle: "Wystąpił błąd podczas zapisywania twoich danych.",
  updateErrorTitle: "Wystąpił błąd podczas zapisywania twoich nowych danych.",
  registerSuccessDescription: "Pomyślnie zapisano twoje dane.",
  updateSuccessDescription: "Pomyślnie zapisano twoje nowe dane.",

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
  tryAgain: "Nie udało się dodać gry. Proszę spróbuj ponownie",
  gameInstanceAdded: "Egzemplarz gry został dodany.",
  gameInstanceDescriptionMin: "Opis musi mieć przynajmniej 2 znaki.",
  gameInstanceDescriptionMax: "Opis musi mieć maksymalnie 500 znaków",
  gameInstancePriceValue: "Cena musi być przynajmniej 0",
  yourGameDetails: "INFORMACJE O TWOJEJ GRZE",
  provideGamePrice: "Podaj cenę swojego egzemplarza gry",
  typeHere: "Wpisz tutaj...",
  addGameDesc: "Dodaj opis swojej gry",
  chooseGameTitle: "Wybierz tytuł gry",
  uploadGamePhotos: "DODAJ ZDJĘCIA SWOJEJ GRY",
  noOpinionsGameInstance: "Ten egzemplarz nie ma jeszcze żadnej opinii",

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

  reservationHeader: "rezerwacja - {{reservationId}} - szczegóły",
  status: "Status:",
  renterMessage: "Wiadomość od wypożyczającego:",
  renterNoMessage: "Wypożyczający nie zostawił żadnego wiadomości.",
  rentersOpinion: "Opinia wypożyczającego o tobie",
  rentersNoOpinion: "Wypożyczający nie dodał opinii o tobie.",
  rentersGameOpinion: "Opinia wypożyczającego o twojej grze",
  rentersNoGameOpinion: "Wypożyczający nie dodał opinii o twojej grze.",
  renterDetails: "Wypożyczający - szczegóły",
  yourOpinionAboutRenter: "Twoja opinia o wypożyczającym",
  gameDetails: "Gra - szczegóły",
  gameReservationsCalendar: "Kalendarz rezerwacji gry",
  noOpinions: "Użytkownik nie ma jeszcze żadnej opinii",
  cannotAddOpinionAboutOwner: "Nie możesz dodać jeszcze opinii o właścicielu gry.",
  cannotAddOpinionAboutRenter: "Nie możesz dodać jeszcze opinii o wypożyczającym.",
  cannotAddOpinionAboutGame: "Nie możesz dodać jeszcze opinii o tej grze.",
  gameNoOpinions: "Brak opinii",
  successChangingStatus: "Status zmieniony pomyślnie",
  successChangingStatusDescription:
    "Aktualny status to {{status}}. Wysłaliśmy maila z potwierdzeniem zmiany statusu.",
  errorChangingStatus: "Wystąpił błąd podczas zmiany statusu.",
  errorChangingStatusDescription: "Nie zmieniono statusu.",
};

export default pl;
