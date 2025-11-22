export interface SaleAggregateRow {
  product_id: number;
  product_name: string;
  bucket: string;
  total_qty: string;
  total_amount: string;
}

export interface WeeklySaleSummery {
  day_of_week: number;
  total_sale: number;
}
