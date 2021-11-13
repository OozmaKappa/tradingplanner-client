import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ITrade } from 'app/modules/admin/trade/trade.types';
import { cloneDeep } from 'lodash-es';
import { ApiService } from 'app/shared/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class TradeService
{
    // Private
    private _trade: BehaviorSubject<ITrade | null> = new BehaviorSubject(null);
    private _trades: BehaviorSubject<ITrade[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private _apiService: ApiService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for trades
     */
    get trades$(): Observable<ITrade[]>
    {
        return this._trades.asObservable();
    }

    /**
     * Getter for trade
     */
    get trade$(): Observable<ITrade>
    {
        return this._trade.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get trades
     */
    getTrades(): Observable<ITrade[]>
    {
        return this._httpClient.get<ITrade[]>(this._apiService.getTradeApi()).pipe(
            tap((response: ITrade[]) => {
                this._trades.next(response);
            })
        );
    }

    /**
     * Get trade by id
     */
    getTradeById(id: string): Observable<ITrade>
    {
        return this._trades.pipe(
            take(1),
            map((trades) => {

                // Find within the folders and files
                const trade = trades.find(value => value.id === id) || null;

                // Update the trade
                this._trade.next(trade);

                // Return the trade
                return trade;
            }),
            switchMap((trade) => {

                if ( !trade )
                {
                    return throwError('Could not found the trade with id of ' + id + '!');
                }

                return of(trade);
            })
        );
    }

    /**
     * Create trade
     *
     * @param trade
     */
    createTrade(trade: ITrade): Observable<ITrade>
    {
        return this._httpClient.post<ITrade>(this._apiService.createTradeApi(), trade).pipe(
            switchMap(response => this.getTrades().pipe(
                switchMap(() => this.getTradeById(response.id).pipe(
                    map(() => response)
                ))
            )));
    }

    /**
     * Update the trade
     *
     * @param trade
     */
    updateTrade(trade: ITrade): Observable<ITrade>
    {
        // Clone the trade to prevent accidental reference based updates
        const updatedTrade = cloneDeep(trade) as any;

        // Before sending the trade to the server, handle the labels
        if ( updatedTrade.labels.length )
        {
            updatedTrade.labels = updatedTrade.labels.map(label => label.id);
        }

        return this._httpClient.patch<ITrade>('api/apps/trades', {updatedTrade}).pipe(
            tap((response) => {

                // Update the trades
                this.getTrades().subscribe();
            })
        );
    }

    /**
     * Delete the trade
     *
     * @param trade
     */
    deleteTrade(trade: ITrade): Observable<boolean>
    {
        return this._httpClient.delete<boolean>('api/apps/trades', {params: {id: trade.id}}).pipe(
            map((isDeleted: boolean) => {

                // Update the trades
                this.getTrades().subscribe();

                // Return the deleted status
                return isDeleted;
            })
        );
    }
}
