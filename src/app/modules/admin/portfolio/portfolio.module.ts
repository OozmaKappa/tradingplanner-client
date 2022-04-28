import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PortfolioDetailsComponent } from './details/details.component';
import { MatIconModule } from '@angular/material/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
    declarations: [PortfolioComponent, PortfolioDetailsComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        NgApexchartsModule,
        PerfectScrollbarModule,
    ],
    exports: [PortfolioComponent]
})
export class PortfolioModule { }
