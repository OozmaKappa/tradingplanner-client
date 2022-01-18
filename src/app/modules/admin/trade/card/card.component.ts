import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TradeService } from '../trade.service';
import { ITrade } from '../trade.types';

@Component({
    selector: 'trade-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class TradeCardComponent implements OnInit {
    trades$: Observable<ITrade[]>;
    trade: ITrade;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _tradeService: TradeService) { }

    ngOnInit(): void {
        console.log('Init trade card');
        this.trades$ = this._tradeService.trades$;
        this.trades$
            // .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((trades) => {
                if (trades){

                    console.log(`Loaded ${trades.length} trades for the card`);
                    //TODO: sort the trades by date and pick the newest one, or even better, let backend deliver the latest one.
                    this.trade = trades[trades.length - 1];
                }
            });
    }

}
