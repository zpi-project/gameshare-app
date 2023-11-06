export interface Paginated<T> {
  paginationInfo: {
    totalElements: number;
    totalPages: number;
  };
  results: T[];
}
