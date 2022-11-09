import { StockResponse, StockRequest } from './../interfaces/stock.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StockServerService {
  constructor(private http: HttpClient) {}

  url = environment.endpoint;

  getAllStock(date?: Date) {
    let queryDate = '';
    if (!date) {
      queryDate = new Date().toISOString().split('T')[0];
    } else {
      queryDate = new Date(date).toISOString().split('T')[0];
    }
    return this.http.get<StockResponse[]>(
      `${this.url}/api/stocks?date=${queryDate}`
    );
  }

  filterByCode(code: string, from: Date | null, to: Date | null) {
    if (!to) {
      to = new Date();
    }
    if (!from) {
      from = new Date();
      from = new Date(from.setDate(to.getDate() - 5));
    }
    let dateTo = to.toUTCString().split('T')[0];
    let dateFrom = from.toISOString().split('T')[0];
    return this.http.get<StockResponse[]>(
      `${this.url}/api/stocks/search?stockSymbol=${code}&startDate=${dateFrom}&endDate=${dateTo}`
    );
  }

  createNewStock(stock: StockRequest) {
    return this.http.post(`${this.url}/api/stocks/add-stock`, stock);
  }

  addStockToFavorite(id: number) {
    const userId = Number.parseInt(localStorage.getItem('userId') || '0');
    return this.http.post(
      `${this.url}/api/users/follow-stock/${userId}/${id}`,
      {}
    );
  }

  getStockLiked() {
    const userId = Number.parseInt(localStorage.getItem('userId') || '0');
    return this.http.get<StockResponse[]>(
      `${this.url}/api/users/liked-stocks/${userId}`
    );
  }
}
