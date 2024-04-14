export type InterpellationSelectedFilters = {
  offset: number;
  limit: number;
  sort_by: InterpellationSortableFields;
  title: string;
  /**
   * Can be either "Adamczyk Rafał" or MP id like "001"
   */
  from: string;
  /**
   * Example value "minister sprawiedliwości"
   */
  to: string;
  /**
   * Date, example value "2021-01-02"
   */
  since: string;
  /**
   * Date, example value "2021-01-02"
   */
  till: string;
  /**
   * Datetime, example value "2021-01-01T10:12"
   */
  modifiedSince: string;
};

export type InterpellationSortableFields =
  | 'lastModified'
  | 'num'
  | 'receiptDate'
  | 'sentDate';
