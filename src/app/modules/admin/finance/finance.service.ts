import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    private _data2: BehaviorSubject<any> = new BehaviorSubject(null);


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }
    get data2$(): Observable<any> {
        return this._data2.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any> {
        return this._httpClient.get('api/dashboards/finance').pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
        //     }
        //     getData2(): Observable<any> {
        //     return from(
        //       fetch(
        //         'https://frozen-basin-69812.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/trades', // the url you are trying to access
        //         {
        //           headers: {
        //             'Content-Type': 'application/json',
        //           },
        //           method: 'GET',
        //           mode: 'no-cors'
        //         }
        //       ));
        //   }
    }
    getTradeData() {
        return this._httpClient.get('https://tranquil-bastion-48091.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/trades');
    }
    geStrategyData() {
        return this._httpClient.get('https://tranquil-bastion-48091.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/strategy');
    }
    getData2() {
        return this._httpClient.get('https://tranquil-bastion-48091.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/trades');
    }
    postStrategy(f) {
        console.log(f)
        return this._httpClient.post('https://tranquil-bastion-48091.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/strategy', {
            "name": f.name,
            "seed": f.seedCapital,
            "maxLoss": f.strategyRisk,
            "maxTradeLoss": f.tradeRisk,
            "comment": f.description
        });
    }
    postTrade(f) {
        return this._httpClient.post('https://tranquil-bastion-48091.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/trades',
            {
                "amount": f.amount,
                "price": f.price,
                "side": f.side,
                "ticker": f.ticker,
                "type": f.trade_type,
                "comment": f.comments,
                "orderType": f.order_type
            });
    }

}
