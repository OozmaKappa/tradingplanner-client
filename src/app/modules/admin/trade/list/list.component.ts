import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TradeDetailsComponent } from '../details/details.component';
import { TradeService } from '../trade.service';
import { ETradeStatus, ITrade } from '../trade.types';

@Component({
    selector: 'trade-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeListComponent implements OnInit, OnDestroy {
    @Input() strategyId: string;
    // @ViewChild('recentTradesTable', { read: MatSort }) recentTradesTableMatSort: MatSort;
    trades$: Observable<ITrade[]>;
    trades: ITrade[];
    tradeStatus: typeof ETradeStatus = ETradeStatus;

    tradesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    tradesTableColumns: string[] = ['ticker', 'updatedAt', 'side', 'price', 'amount', 'pnl', 'status', 'actions'];

    // drawerMode: 'over' | 'side' = 'side';
    // drawerOpened: boolean = true;
    // filter$: BehaviorSubject<string> = new BehaviorSubject('notes');
    // searchQuery$: BehaviorSubject<string> = new BehaviorSubject(null);
    // masonryColumns: number = 4;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog,
        private _tradeService: TradeService,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the filter status
     */
    // get filterStatus(): string {
    //     return this.filter$.value;
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Request the data from the server
        // this._tradeService.getTrades().subscribe();
        console.log('Init trade list component');
        this.trades$ = this._tradeService.trades$;
        this.trades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((trades) => {
                this.updateDataSource(trades);
            });
        console.log(`strategyId: ${this.strategyId}`);
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

    /**
     * Open the trade details view
     */
    openTradeDialog(trade: ITrade): void {
        this._matDialog.open(TradeDetailsComponent, {
            autoFocus: false,
            data: { strategyId: this.strategyId, trade }
        });
    }

    updateDataSource(trades) {
        console.log(trades);
        if (this.strategyId) {
            this._tradeService.getTradesByStrategyId(this.strategyId)
                .pipe(take(1))
                .subscribe(
                    (strategyTrades) => {
                        this.tradesDataSource.data = [...strategyTrades];
                        console.log(`strategyTrades: ${strategyTrades.length}`);
                        this.changeDetectorRefs.detectChanges();
                    }
                );
        }
    }

    calculateTradesByStatus(status: ETradeStatus): number {
        const filteredData = this.tradesDataSource.data.filter(trade => trade.status === status);
        return filteredData.length;
    }
}
