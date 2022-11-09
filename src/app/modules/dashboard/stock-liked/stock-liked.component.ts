import { StockServerService } from 'src/app/shared/services/stock-server.service';
import { StockResponse } from './../../../shared/interfaces/stock.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-liked',
  templateUrl: './stock-liked.component.html',
  styleUrls: ['./stock-liked.component.css'],
})
export class StockLikedComponent implements OnInit {
  constructor(private service: StockServerService) {
    this.loadStock();
  }
  page = 1;
  pageSize = 10;

  tableHeader: {
    title: string;
    dataIndex: string;
    key: string;
    align: string;
  }[] = [
    {
      title: 'Mã chứng khoán',
      dataIndex: 'stockSymbol',
      key: 'stockSymbol',
      align: 'center',
    },
    {
      title: 'Giá chứng khoán',
      dataIndex: 'stockPrice',
      key: 'stockPrice',
      align: 'right',
    },
    {
      title: 'Lợi nhuận / 1 cổ phiếu',
      dataIndex: 'eps',
      key: 'eps',
      align: 'right',
    },
    {
      title: 'Lợi nhuận ròng',
      dataIndex: 'netProfit',
      key: 'netProfit',
      align: 'right',
    },
    {
      title: 'Ngày thống kê',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
    },

    {
      title: 'Đầu tư',
      key: 'label',
      dataIndex: 'label',
      align: 'center',
    },
   
  ];

  stocksLiked: StockResponse[] = [];
  cloneData: StockResponse[] = [];
  ngOnInit(): void {}

  loadStock() {
    this.service.getStockLiked().subscribe((response) => {
      this.cloneData = response;
      this.stocksLiked = response;
    });
  }
}
