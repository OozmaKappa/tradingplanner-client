import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade.component';
import { Route, RouterModule } from '@angular/router';
import { TradeListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TradeDetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TradeCardComponent } from './card/card.component';
import { MatDividerModule } from '@angular/material/divider';

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
  declarations: [TradeComponent, TradeListComponent, TradeDetailsComponent, TradeCardComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(tradeRoutes),
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    CommonModule],
  exports: [TradeListComponent, TradeCardComponent]
})
export class TradeModule {}
