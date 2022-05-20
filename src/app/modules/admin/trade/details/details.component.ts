import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { TradeService } from 'app/modules/admin/trade/trade.service';
import { ITrade } from 'app/modules/admin/trade/trade.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'trades-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeDetailsComponent implements OnInit, OnDestroy {
    tradeForm: FormGroup;
    trade$: Observable<ITrade>;
    tradeChanged: Subject<ITrade> = new Subject<ITrade>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { strategyId: string },
        private _changeDetectorRef: ChangeDetectorRef,
        private _tradeService: TradeService,
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<TradeDetailsComponent>
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.tradeForm = this._formBuilder.group({
            side: ['BUY', [Validators.required]],
            trade_type: ['STK', [Validators.required]],
            ticker: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            price: ['', [Validators.required]],
            order_type: ['LMT', [Validators.required]],
            openedAt: [''],
            cost: ['1.00'],
            comment: ['']
        });
        this.tradeForm.get('openedAt')?.setValue(new Date())
        // Subscribe to trade updates
        this.tradeChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                switchMap(trade => this._tradeService.updateTrade(trade)))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
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
     * Create a new trade
     *
     * @param trade
     */
    createTrade(trade: ITrade): void {
        this._tradeService.createTrade(trade).pipe(
            map(() => {
                // Get the trade
                this.trade$ = this._tradeService.trade$;
            })).subscribe();
    }

    onSubmit(form): void {
        const newTrade: ITrade = {
            ticker: form.value.ticker,
            price: form.value.price,
            type: form.value.trade_type,
            amount: form.value.amount,
            side: form.value.side,
            orderType: form.value.order_type,
            openedAt: form.value.openedAt,
            cost: form.value.cost,
            comment: form.value.comment,
            strategy: this.data.strategyId
        };

        console.log(`Submit trade with form values: ${JSON.stringify(newTrade)}`);
        this._tradeService.createTrade(newTrade).subscribe((res) => {
            console.log(res);
        });
    }

    onNoClick(): void {
        this._matDialogRef.close();
    }

    // /**
    //  * Upload image to given trade
    //  *
    //  * @param trade
    //  * @param fileList
    //  */
    // uploadImage(trade: ITrade, fileList: FileList): void
    // {
    //     // Return if canceled
    //     if ( !fileList.length )
    //     {
    //         return;
    //     }

    //     const allowedTypes = ['image/jpeg', 'image/png'];
    //     const file = fileList[0];

    //     // Return if the file is not allowed
    //     if ( !allowedTypes.includes(file.type) )
    //     {
    //         return;
    //     }

    //     this._readAsDataURL(file).then((data) => {

    //         // Update the image
    //         trade.image = data;

    //         // Update the trade
    //         this.tradeChanged.next(trade);
    //     });
    // }

    // /**
    //  * Remove the image on the given trade
    //  *
    //  * @param trade
    //  */
    // removeImage(trade: ITrade): void
    // {
    //     trade.image = null;

    //     // Update the trade
    //     this.tradeChanged.next(trade);
    // }

    /**
     * Update the trade details
     *
     * @param trade
     */
    updateTradeDetails(trade: ITrade): void {
        this.tradeChanged.next(trade);
    }

    /**
     * Delete the given trade
     *
     * @param trade
     */
    deleteTrade(trade: ITrade): void {
        this._tradeService.deleteTrade(trade)
            .subscribe((isDeleted) => {

                // Return if the trade wasn't deleted...
                if (!isDeleted) {
                    return;
                }

                // Close the dialog
                this._matDialogRef.close();
            });
    }

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

    // /**
    //  * Read the given file for demonstration purposes
    //  *
    //  * @param file
    //  */
    // private _readAsDataURL(file: File): Promise<any>
    // {
    //     // Return a new promise
    //     return new Promise((resolve, reject) => {

    //         // Create a new reader
    //         const reader = new FileReader();

    //         // Resolve the promise on success
    //         reader.onload = (): void => {
    //             resolve(reader.result);
    //         };

    //         // Reject the promise on error
    //         reader.onerror = (e): void => {
    //             reject(e);
    //         };

    //         // Read the file as the
    //         reader.readAsDataURL(file);
    //     });
    // }
}
