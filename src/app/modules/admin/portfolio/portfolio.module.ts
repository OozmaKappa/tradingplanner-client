import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PortfolioDetailsComponent } from './details/details.component';
import { MatIconModule } from '@angular/material/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [PortfolioComponent, PortfolioDetailsComponent],
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatTableModule,
        MatTooltipModule,
        MatMenuModule,
        MatFormFieldModule,
        NgApexchartsModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
    ],
    exports: [PortfolioComponent]
})
export class PortfolioModule { }
