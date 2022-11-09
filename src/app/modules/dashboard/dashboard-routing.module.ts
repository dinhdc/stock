import { StockLikedComponent } from './stock-liked/stock-liked.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockComponent } from './stock/stock.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stocks',
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'stocks',
        component: StockComponent,
      },
      {
        path: 'stocks/:code',
        component: StockDetailComponent,
      },
      {
        path: 'stocks-liked',
        component: StockLikedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
