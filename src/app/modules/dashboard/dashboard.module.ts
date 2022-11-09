import { SharedModule } from './../../shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StockComponent } from './stock/stock.component';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockLikedComponent } from './stock-liked/stock-liked.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    DashboardComponent,
    StockComponent,
    StockDetailComponent,
    StockLikedComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    FormsModule,
    NgbModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class DashboardModule {}
