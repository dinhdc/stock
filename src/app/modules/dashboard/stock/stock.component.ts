import { StockServerService } from './../../../shared/services/stock-server.service';
import { StockResponse } from './../../../shared/interfaces/stock.interface';
import * as _ from 'lodash';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, Injectable, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDateAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { retry } from 'rxjs';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class StockComponent implements OnInit {
  closeResult = '';
  modalReferener!: NgbModalRef;

  successStatus = false;
  failureStatus = false;
  model2!: string;
  pageSize = 10;
  page = 1;
  pages = 1;

  stockForm: FormGroup;

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
    {
      title: 'Chi tiết',
      key: '',
      dataIndex: '',
      align: 'center',
    },
  ];

  stocks: StockResponse[] = [];

  cloneData: StockResponse[] = [];

  ngOnInit(): void {}
  filter = new FormControl('', { nonNullable: true });
  date = new FormControl('', { nonNullable: true });
  loading = true;

  constructor(
    private modalService: NgbModal,
    private service: StockServerService,
    private fb: FormBuilder,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.stockForm = this.fb.group({
      stockSymbol: ['', [Validators.required]],
      netProfit: [0, [Validators.required]],
      totalAssets: [0, [Validators.required]],
      revenue: [0, [Validators.required]],
      currentAssets: [0, [Validators.required]],
      currentDebt: [0, [Validators.required]],
      totalLiabilities: [0, [Validators.required]],
      stockPrice: [0, [Validators.required]],
      eps: [0, [Validators.required]],
    });
    this.date.setValue(new Date().toISOString().split('T')[0]);
    this.loadStock();

    this.filter.valueChanges.subscribe((key) => {
      this.loading = true;
      this.stocks = this.cloneData.filter((item) =>
        item.stockSymbol.includes(key)
      );
      this.pages = Math.ceil(this.cloneData.length / this.pageSize);
      this.loading = false;
    });
  }

  open(content: any) {
    this.modalReferener = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modalReferener.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onCreateStock() {
    this.service.createNewStock(this.stockForm.value).subscribe(
      (res) => {
        this.loadStock();
        this.stockForm.reset();
        this.successStatus = true;
        this.modalReferener.close('Save click');
        setTimeout(() => {
          this.successStatus = false;
        }, 3000);
      },
      (error) => {
        this.failureStatus = true;
        setTimeout(() => {
          this.failureStatus = false;
        }, 3000);
      }
    );
  }

  loadStock() {
    this.loading = true;
    // const { year, month, day } = this.date.value;

    this.service.getAllStock().subscribe(
      (data) => {
        this.cloneData = data;
        this.stocks = this.cloneData;
        this.pages = Math.ceil(this.cloneData.length / this.pageSize);
        this.loading = false;
      },
      (error) => {
        retry(3);
      }
    );
  }

  fieldControl(fieldName: string) {
    return this.stockForm.get(fieldName);
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  closeAlert(type: string) {
    if (type === 'success') {
      this.successStatus = false;
    }
    if (type === 'danger') {
      this.failureStatus = false;
    }
  }

  onSearch() {
    this.loading = true;
    // const { year, month, day } = this.date.value;

    this.service.getAllStock(new Date(this.date.value)).subscribe(
      (data) => {
        this.cloneData = data;
        this.stocks = this.cloneData.filter((item) =>
          item.stockSymbol.includes(this.filter.value)
        );
        this.pages = Math.ceil(this.cloneData.length / this.pageSize);
        this.loading = false;
      },
      (error) => {
        retry(3);
      }
    );
  }

  addToFavorite(id: number) {
    this.service.addStockToFavorite(id).subscribe(
      (next) => {
        this.successStatus = true;
        setTimeout(() => {
          this.successStatus = false;
        }, 3000);
      },
      (error) => {
        this.failureStatus = true;
        setTimeout(() => {
          this.failureStatus = false;
        }, 3000);
      }
    );
  }
}
