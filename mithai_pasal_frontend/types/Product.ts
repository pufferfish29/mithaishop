export type productType = {
  name: string;
  pricePerKG: number;
  unitPrice: number;
};

export type productGetResponseType = {
  items: productResponseItemInterface[];
  page: number;
  total: number;
};

export interface productResponseItemInterface {
  id: number;
  name: string;
  unitPrice: number;
  pricePerKG: number;
}
