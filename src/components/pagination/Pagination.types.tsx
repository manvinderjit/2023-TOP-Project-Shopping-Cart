export interface Paginatable {
  totalPages: number;
  currentPageIndex: number;
  handleChangeIndex: (pageIndex: number) => void;
}
