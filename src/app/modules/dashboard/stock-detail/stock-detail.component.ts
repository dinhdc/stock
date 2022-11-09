import { StockResponse } from './../../../shared/interfaces/stock.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StockServerService } from 'src/app/shared/services/stock-server.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css'],
})
export class StockDetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private service: StockServerService
  ) {}
  code = '';
  from: Date | null = null;
  to: Date | null = null;

  stockByDate: StockResponse[] = [];
  cloneData: StockResponse[] = [];

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
      title: 'Tổng tài sản',
      dataIndex: 'totalAssets',
      key: 'totalAssets',
      align: 'right',
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      align: 'right',
    },
    {
      title: 'Tổng tài sản hiện tại',
      key: 'currentAssets',
      dataIndex: 'currentAssets',
      align: 'right',
    },
    {
      title: 'Nợ hiện tại',
      key: 'currentDebt',
      dataIndex: 'currentDebt',
      align: 'right',
    },
    {
      title: 'Tổng số nợ',
      key: 'totalLiabilities',
      dataIndex: 'totalLiabilities',
      align: 'right',
    },
    {
      title: 'Đầu tư',
      key: 'label',
      dataIndex: 'label',
      align: 'center',
    },
    {
      title: 'Chi tiết',
      key: '',
      dataIndex: '',
      align: 'center',
    },
  ];

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.code = params['code'];
      this.loadStock();
    });
  }

  loadStock() {
    this.service
      .filterByCode(this.code, this.from, this.to)
      .subscribe((response) => {
        this.cloneData = response;
        this.stockByDate = response;
      });
  }
}
