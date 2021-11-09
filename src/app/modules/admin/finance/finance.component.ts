import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApexOptions } from 'ng-apexcharts';
import { FinanceService } from 'app/modules/admin/finance/finance.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'finance',
    templateUrl: './finance.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinanceComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    chartImpressions: ApexOptions;
    data: any;
    data1: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['_id', 'orderType', 'type', 'strategy', 'ticker', 'price', 'amount', 'status'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    form: FormGroup;
    form2: FormGroup;


    /**
     * Constructor
     */
    constructor(private _financeService: FinanceService,
        private _analyticsService: AnalyticsService, private _formBuilder: FormBuilder,
        public dialog: MatDialog) {
        this.form = this._formBuilder.group({
            strategy: this._formBuilder.group({
                name: '',
                seedCapital: '',
                strategyRisk: '',
                strategyRiskUnit: '',
                tradeRisk: '',
                tradeRiskUnit: '',
                description: ''
            })
        })
    }

    openDialog1(): void {
        const dialogRef = this.dialog.open(Dialog1Component, {
            width: '60%'
        });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
        // });
    }
    onSubmit(f) {
        console.log(f.form.value.strategy)
        this._financeService.postStrategy(f.form.value.strategy).subscribe(res => { console.log(res) })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this._analyticsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                console.log(data);
                // Store the data
                this.data1 = data;

                // Prepare the chart data
                this._prepareChartData1();
            });
        this._financeService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                console.log(data);

                // Store the data
                this.data = data;

                // Store the table data
                // this.recentTransactionsDataSource.data = data.recentTransactions;

                // Prepare the chart data
                this._prepareChartData();
            });
        this._financeService.getTradeData().subscribe((res) => {
            this.recentTransactionsDataSource.data = [res];
            console.log(res, this.recentTransactionsDataSource.data[0]);
        });
        this._financeService.geStrategyData().subscribe((res) => {
            console.log(res);
        });
    }
    postStrategyData(f) {

    }
    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Make the data source sortable
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Account balance
        this.accountBalanceOptions = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#A3BFFA', '#667EEA'],
            fill: {
                colors: ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type: 'solid'
            },
            series: this.data.accountBalance.series,
            stroke: {
                curve: 'straight',
                width: 2
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'MMM dd, yyyy'
                },
                y: {
                    formatter: (value): string => value + '%'
                }
            },
            xaxis: {
                type: 'datetime'
            }
        };
    }
    private _prepareChartData1(): void {
        this.chartImpressions = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#34D399'],
            fill: {
                colors: ['#34D399'],
                opacity: 0.5
            },
            series: this.data1.impressions.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data1.impressions.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => val.toString()
                }
            }
        };
    }
}
@Component({
    selector: 'dialog-overview1',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class Dialog1Component {
    form: FormGroup;
    constructor(private _financeService: FinanceService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<Dialog1Component>) {
        this._financeService.getData2().subscribe((res) => {
            console.log(res);
        });
        this.form = this._formBuilder.group({
            strategy: this._formBuilder.group({
                side: '',
                trade_type: '',
                ticker: '',
                amount: '',
                price: '',
                order_type: '',
                comments: ''
            })
        })
    }
    onSubmit(f) {
        console.log(f.form.value.strategy);
        this._financeService.postTrade(f.form.value.strategy).subscribe(res => {
            console.log(res);
            this._financeService.getData2().subscribe((res) => {
                console.log(res);
            });
        })
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
