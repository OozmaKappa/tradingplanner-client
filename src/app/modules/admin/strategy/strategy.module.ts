import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { StrategyComponent } from './strategy.component';
import { TradeModule } from '../trade/trade.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StrategyDetailsComponent } from './details/details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const strategyRoutes: Route[] = [
  {
    path: '',
    component: StrategyComponent,
    outlet: 'strategy'
  }
];

@NgModule({
  declarations: [
    StrategyComponent, StrategyDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(strategyRoutes),
    FormsModule,
    FuseCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    TradeModule,
  ],
  exports: [
    StrategyComponent
  ]
})
export class StrategyModule { }
