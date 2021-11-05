import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { FinanceComponent } from 'app/modules/admin/finance/finance.component';
import { financeRoutes } from 'app/modules/admin/finance/finance.routing';
import { FuseCardModule } from '@fuse/components/card';


@NgModule({
    declarations: [
        FinanceComponent
    ],
    imports     : [
        RouterModule.forChild(financeRoutes),
        FuseCardModule,
        MatTabsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        NgApexchartsModule,
        SharedModule,
        HttpClientModule
    ]
})
export class FinanceModule
{
}
