import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTab } from '@angular/material/tabs';
import { cloneDeep } from 'lodash';
import { ApexAxisChartSeries, ApexOptions } from 'ng-apexcharts';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { first, takeUntil } from 'rxjs/operators';
import { StrategyDetailsComponent } from './details/details.component';
import { StrategyService } from './strategy.service';
import { IStrategy } from './strategy.types';

@Component({
    selector: 'app-strategy',
    templateUrl: './strategy.component.html',
})
export class StrategyComponent implements OnInit, AfterViewChecked, OnDestroy {

    @ViewChildren('strategyView') tabs: QueryList<ElementRef>;
    chart$: Observable<ApexOptions>;

    initialChart: ApexOptions = {
        chart: {
            animations: {
                enabled: true
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'area',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#34D399', '#EF4444'],
        fill: {
            colors: ['#34D399'],
            opacity: 0.5
        },
        series: [
            {
                name: 'Unrealised P&L',
                data: []
            },
            {
                name: 'Unrealised P&L',
                data: []
            }
        ],
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            followCursor: true,
            theme: 'dark',
            x           : {
                format: 'MMM dd, yyyy'
            },
            y           : {
                formatter: (value: number): string => `${value}`
            }
        },
        xaxis: {
            categories: [],
            type: 'category'
        },
        yaxis: {
            labels: {
                formatter: (val): string => val.toString()
            }
        }
    };
    strategies$: Observable<IStrategy[]>;
    selected = new FormControl(0);
    currentStrategyId: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private _matDialog: MatDialog,
        private _strategyService: StrategyService
    ) { }

    ngOnInit(): void {
        // Request the data from the server
        this._strategyService.getStrategies().subscribe();
        this.strategies$ = this._strategyService.strategies$;
        // this.strategies$.subscribe((strategies) => {
        //     if (strategies[0] && strategies[0].id) {
        //         this._prepareChartData(strategies[0].id);
        //     }
        //     console.log(`Strategies: ${strategies}`);
        // });
        // this._strategyService.strategies$
        //     // .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((strategies) => {
        //         // Prepare the chart data
        //         if (strategies[0] && strategies[0].id) {
        //             this._prepareChartData(strategies[0].id);
        //         }
        //         console.log(`Strategies: ${strategies}`);
        //     });
        this._strategyService.strategies$.forEach((strategies) => {
            console.log(`OnInit strategies$.forEach ${strategies}` );
            this._prepareChartData(strategies[0].id);
            // console.log(strategy);
            this.chart$ = of(this.initialChart);
        });
    }

    ngAfterViewChecked(): void {
        const shown = this.tabs.find((tab: unknown | ElementRef) => !!tab);
        if (shown && (shown.nativeElement as HTMLDivElement).id) {
            console.log('Tab shown is ' + (shown.nativeElement as HTMLDivElement).id);
            setTimeout(() => {
                this._prepareChartData((shown.nativeElement as HTMLDivElement).id);
            }, 0);
        }
        // console.log(`after view checked: ${JSON.stringify(this.selected)}`);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     * Open the new strategy dialog
     */
    openNewStrategyDialog(): void {
        this._matDialog.open(StrategyDetailsComponent, {
            autoFocus: false
        });
    }

    calculateAmountOfPercent(base: number, percent: number): number {
        return Math.round((base * percent) / 100);
    }

    private _prepareChartData(strategyId: string): void {
        if (!strategyId || this.currentStrategyId === strategyId) {
            return;
        }
        this.currentStrategyId = strategyId;
        console.log('Get PnL and create chart');
        this.initialChart.series = [];
        this._strategyService.getPnL(strategyId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pnlData: any) => {
                console.log(`P&L Data: ${JSON.stringify(pnlData)}`);
                this._setChartData(pnlData.realised, pnlData.unrealised);
            });
    }

    private _setChartData(realised: { [key: string]: number}, unrealised: { [key: string]: number}): void {
        // const chart = cloneDeep(this.initialChart);
        // realised.forEach(realValue, index){
        //     this.initialChart.xaxis.categories = Object.keys(realised);
        //     const realValues = Object.values(realised);
        //     const unrealValues = Object.values(unrealised);
        //     this.initialChart.series = [{
        //         name: 'Realised Profit',
        //         data: realValues
        //     }, {
        //         name: 'Unrealised Profit',
        //         data: unrealValues
        //     }];
        // }




        this.initialChart.xaxis.categories = Object.keys(realised);
        const realValues = Object.values(realised);
        const unrealValues = Object.values(unrealised);
        this.initialChart.series = [{
            name: 'Realised Profit',
            data: realValues
        }, {
            name: 'Unrealised Profit',
            data: unrealValues
        }];
        // this.initialChart.series = [{
        //     name: 'Realised Profit',
        //     data: realValues.map((num, i) => num >= 0 || realValues[i - 1] >= 0 || realValues[i + 1] >= 0 ? num : NaN)
        // }, {
        //     name: 'Realised Loss',
        //     data: realValues.map((num, i) => num < 0 || realValues[i - 1] < 0 ? num : NaN)
        // }, {
        //     name: 'Unrealised Profit',
        //     data: unrealValues.map((num, i) => num >= 0 || unrealValues[i - 1] >= 0 || unrealValues[i + 1] >= 0 ? num : NaN)
        // }, {
        //     name: 'Unrealised Loss',
        //     data: unrealValues.map((num, i) => num < 0 || unrealValues[i - 1] < 0 ? num : NaN)
        // }];

        // this.chart$ = of(chart);
    }
}
