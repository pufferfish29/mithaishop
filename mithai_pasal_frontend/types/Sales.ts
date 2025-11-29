export type SalesDataResponse = {
  productId: number;
  quantity: number;
  totalAmount: number;
};

export interface SalesClientResponse {
  from: string;
  to: string;
  days: String[];
  series: SalesSeriesResponse[];
}

export interface WeeklySalesResponse {
  day_of_week: number;
  total_sale: number;
}

export interface SalesSeriesResponse {
  productId: number;
  productName: string;
  data: SalesSeriesDataResponse[];
}

export interface SalesSeriesDataResponse {
  date: string;
  quantity: number;
  amount: number;
}

export interface TopSellingProductResponse {
  productId: number;
  productName: string;
  totalQuantity: number;
  totalAmount: number;
}
