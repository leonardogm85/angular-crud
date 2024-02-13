export interface Page<T> {
  records: T[];
  totalElements: number;
  totalPages: number;
}
