import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TradeService } from '../trade.service';
import { ITrade } from '../trade.types';

enum CARD_TYPE {
    last,
    best
}
@Component({
    selector: 'trade-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class TradeCardComponent implements OnInit {
    @Input() title: string;
    @Input() type: CARD_TYPE;
    trades$: Observable<ITrade[]>;
    trade: ITrade;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _tradeService: TradeService, private _utils: UtilsService) { }

    ngOnInit(): void {
        console.log('Init trade card');
        this.trades$ = this._tradeService.trades$;
        this.trades$
            // .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((trades) => {
                if (trades) {

                    console.log(`Loaded ${trades.length} trades for the card`);
                    if (this.type === CARD_TYPE.last) {
                        //TODO: sort the trades by date and pick the newest one, or even better, let backend deliver the latest one.
                        this.trade = trades[trades.length - 1];
                    }
                    else if (this.type === CARD_TYPE.best) {
                        this.trade = trades.reduce((trade1, trade2) => trade1.pnl > trade2.pnl ? trade1 : trade2);
                    }
                }
            });
    }

    calculateRelativeDevelopment(trade: ITrade): number {
        const investment = trade.amount * trade.price;
        const value = investment + trade.pnl;
        return this._utils.calculateRelativeDevelopment(investment, value);
    }

    isProfitable(): boolean{
        return this.trade.pnl > 0;
    }
}
