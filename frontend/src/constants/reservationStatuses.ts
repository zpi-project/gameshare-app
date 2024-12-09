export const RESERVATION_STATUSES = [
  "ACCEPTED_BY_OWNER",
  "REJECTED_BY_OWNER",
  "PENDING",
  "CANCELED_BY_OWNER",
  "CANCELED_BY_RENTER",
  "RENTED",
  "FINISHED",
  "EXPIRED",
];

export const RESERVATION_STATUS_COLORS = {
  ACCEPTED_BY_OWNER: "bg-[#A5D6A7] dark:bg-[#388E3C] hover:bg-[#A5D6A7] dark:hover:bg-[#388E3C]", // Light green / Dark green
  REJECTED_BY_OWNER: "bg-[#FFCDD2] dark:bg-[#D32F2F] hover:bg-[#FFCDD2] dark:hover:bg-[#D32F2F]", // Light red / Dark red
  PENDING: "bg-[#FFF59D] dark:bg-[#c18801] hover:bg-[#FFF59D] dark:hover:bg-[#c18801]", // Light yellow / Dark yellow
  CANCELED_BY_OWNER: "bg-muted dark:bg-muted hover:bg-muted dark:hover:bg-muted", // Light gray / Dark gray
  CANCELED_BY_RENTER: "bg-muted dark:bg-muted hover:bg-muted dark:hover:bg-muted", // Light gray / Dark gray
  RENTED: "bg-[#81D4FA] dark:bg-[#0288D1] hover:bg-[#81D4FA] dark:hover:bg-[#0288D1]", // Light blue / Dark blue
  FINISHED: "bg-[#C5CAE9] dark:bg-[#303F9F] hover:bg-[#C5CAE9] dark:hover:bg-[#303F9F]", // Light purple / Dark purple
  EXPIRED: "bg-[#FFCCBC] dark:bg-[#D84315] hover:bg-[#FFCCBC] dark:hover:bg-[#D84315]", // Light orange / Dark orange
};

export const RESERVATION_STATUS_COLORS_FILTERS = {
  ACCEPTED_BY_OWNER: "bg-[#A5D6A7] dark:bg-[#388E3C]", // Light green / Dark green
  REJECTED_BY_OWNER: "bg-[#FFCDD2] dark:bg-[#D32F2F]", // Light red / Dark red
  PENDING: "bg-[#FFF59D] dark:bg-[#c18801]", // Light yellow / Dark yellow
  CANCELED_BY_OWNER: "bg-muted dark:bg-muted", // Light gray / Dark gray
  CANCELED_BY_RENTER: "bg-muted dark:bg-muted", // Light gray / Dark gray
  RENTED: "bg-[#81D4FA] dark:bg-[#0288D1]", // Light blue / Dark blue
  FINISHED: "bg-[#C5CAE9] dark:bg-[#303F9F]", // Light purple / Dark purple
  EXPIRED: "bg-[#FFCCBC] dark:bg-[#D84315]", // Light orange / Dark orange
};
