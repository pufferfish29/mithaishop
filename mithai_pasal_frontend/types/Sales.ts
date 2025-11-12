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

export interface SalesSeriesResponse {
  productId: number;
  productName: number;
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
