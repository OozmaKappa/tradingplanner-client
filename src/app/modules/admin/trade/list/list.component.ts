import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TradeDetailsComponent } from '../details/details.component';
import { TradeService } from '../trade.service';
import { ITrade } from '../trade.types';

@Component({
    selector: 'trade-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeListComponent implements OnInit, OnDestroy {
    @Input() strategyId: string;
    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    trades$: Observable<ITrade[]>;
    trades: ITrade[];

    tradesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    tradesTableColumns: string[] = ['ticker', 'updatedAt', 'price', 'amount', 'status'];

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    filter$: BehaviorSubject<string> = new BehaviorSubject('notes');
    searchQuery$: BehaviorSubject<string> = new BehaviorSubject(null);
    masonryColumns: number = 4;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog,
        private _tradeService: TradeService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the filter status
     */
    get filterStatus(): string {
        return this.filter$.value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Request the data from the server
        console.log('Init trade list component');
        this._tradeService.getTrades().subscribe();
        this.trades$ = this._tradeService.trades$;
        this.trades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((trades) => {
                // Store the table data

                // Prepare the chart data
                // this._prepareChartData();
                console.log(trades);
                if (this.strategyId) {
                    this._tradeService.getTradesByStrategyId(this.strategyId)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            (strategyTrades) => {
                                this.tradesDataSource.data = strategyTrades;
                            }
                        );
                }
            });

        console.log(`strategyId: ${this.strategyId}`);
        // this.trades$.forEach((trade) => {
        //   console.log(trade);
        // });
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

    /**
     * Open the new trade dialog
     */
    openNewTradeDialog(): void {
        this._matDialog.open(TradeDetailsComponent, {
            autoFocus: false,
            data: { strategyId: this.strategyId }
        });
        // this._matDialog.afterAllClosed.subscribe(()=>{
        //     console.log('Get trades after close dialog');
        //     this._tradeService.getTrades();
        // });
    }
}
