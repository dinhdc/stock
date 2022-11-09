export interface StockResponse {
  id: number;
  stockSymbol: string;
  netProfit: number;
  totalAssets: number;
  revenue: number;
  currentAssets: number;
  currentDebt: number;
  totalLiabilities: number;
  stockPrice: number;
  eps: number;
  createdDate: Date;
  label: string;
}

export interface StockRequest {
  stockSymbol: string;
  netProfit: number;
  totalAssets: number;
  revenue: number;
  currentAssets: number;
  currentDebt: number;
  totalLiabilities: number;
  stockPrice: number;
  eps: number;
}
