import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { StrategyService } from 'app/modules/admin/strategy/strategy.service';
import { IStrategy } from 'app/modules/admin/strategy/strategy.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'strategy-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategyDetailsComponent implements OnInit, OnDestroy {
    strategyForm: FormGroup;
    strategy$: Observable<IStrategy>;
    strategyChanged: Subject<IStrategy> = new Subject<IStrategy>();


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { strategy: IStrategy },
        private _changeDetectorRef: ChangeDetectorRef,
        private _strategyService: StrategyService,
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<StrategyDetailsComponent>
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
        this.strategyForm = this._formBuilder.group({
            name: [this.data.strategy?.name || '', [Validators.required]],
            seed: [this.data.strategy?.seed || 0, [Validators.required]],
            maxLoss: [this.data.strategy?.maxLoss || 0, [Validators.required]],
            maxTradeLoss: [this.data.strategy?.maxTradeLoss || 0, [Validators.required]],
            comment: [this.data.strategy?.comment || '', [Validators.required]],
            ticker: [this.data.strategy?.ticker || '']
        });

        // Subscribe to strategy updates
        this.strategyChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                switchMap(strategy => this._strategyService.updateStrategy(strategy)))
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
     * Create a new strategy
     *
     * @param strategy
     */
    createStrategy(strategy: IStrategy): void {
        this._strategyService.createStrategy(strategy).pipe(
            map(() => {
                // Get the strategy
                this.strategy$ = this._strategyService.strategy$;
            })).subscribe();
    }

    onSubmit(form): void {
        const newStrategy: IStrategy = {
            _id: this.data.strategy?._id,
            name: form.value.name,
            seed: form.value.seed,
            maxLoss: form.value.maxLoss,
            maxTradeLoss: form.value.maxTradeLoss,
            comment: form.value.comment,
            ticker: form.value.ticker,
        };

        console.log(`Submit strategy with form values: ${JSON.stringify(newStrategy)}`);
        if (this.data.strategy) {
            this._strategyService.updateStrategy(newStrategy).subscribe((res) => {
                console.log(res);
            });
        } else {
            this._strategyService.createStrategy(newStrategy).subscribe((res) => {
                console.log(res);
            });
        }
        this._matDialogRef.close();
    }

    onNoClick(): void {
        this._matDialogRef.close();
    }


    /**
     * Update the strategy details
     *
     * @param strategy
     */
    updateStrategyDetails(strategy: IStrategy): void {
        this.strategyChanged.next(strategy);
    }

    /**
     * Delete the given strategy
     *
     * @param strategy
     */
    deleteStrategy(strategy: IStrategy): void {
        this._strategyService.deleteStrategy(strategy)
            .subscribe((isDeleted) => {

                // Return if the strategy wasn't deleted...
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

}
