import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade.component';
import { Route, RouterModule } from '@angular/router';
import { TradeListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

const tradeRoutes: Route[] = [
  {
    path: '',
    component: TradeComponent,
    outlet: 'trade_overview'
  },
  {
    path: '',
    component: TradeListComponent,
    outlet: 'trade_list'
  }
];

@NgModule({
  declarations: [TradeComponent, TradeListComponent],
  imports: [
    RouterModule.forChild(tradeRoutes),
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule],
  exports: [TradeListComponent]
})
export class TradeModule {}
