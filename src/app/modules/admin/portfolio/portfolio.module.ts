import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    declarations: [PortfolioComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatMenuModule,
        NgApexchartsModule,

    ],
    exports: [PortfolioComponent]
})
export class PortfolioModule { }
