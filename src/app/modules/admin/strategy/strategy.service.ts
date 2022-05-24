import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { cloneDeep } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { IStrategy } from './strategy.types';

@Injectable({
    providedIn: 'root'
})
export class StrategyService {

    private _strategy: BehaviorSubject<IStrategy | null> = new BehaviorSubject(null);
    private _strategies: BehaviorSubject<IStrategy[] | null> = new BehaviorSubject(null);
    private _apiService: ApiService;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this._apiService = new ApiService('strategy');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for strategie
     * s
     */
    get strategies$(): Observable<IStrategy[]> {
        return this._strategies.asObservable();
    }

    /**
     * Getter for strategy
     */
    get strategy$(): Observable<IStrategy> {
        return this._strategy.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get strategies
     */
    getStrategies(): Observable<IStrategy[]> {
        return this._httpClient.get<IStrategy[]>(this._apiService.getAllApi()).pipe(
            tap({
                next: (response: IStrategy[]) => {
                    this._strategies.next(response);
                },
                error: e => { console.log(e) }
            })
        );
    }

    /**
     * Create strategy
     *
     * @param strategy
     */
    createStrategy(strategy: IStrategy): Observable<IStrategy> {
        return this._httpClient.post<IStrategy>(this._apiService.createApi(), strategy).pipe(
            // switchMap(response => this.getStrategys().pipe(
            //     switchMap(() => this.getStrategyById(response.id).pipe(
            map(response => response)
            //     ))
            // ))
        );
    }

    /**
     * Update the strategy
     *
     * @param strategy
     */
    updateStrategy(strategy: IStrategy): Observable<IStrategy> {
        return this._httpClient.patch<IStrategy>(this._apiService.updateApi(strategy._id), strategy).pipe(
            tap(() => { this.getStrategies().subscribe() })
        );
    }

    /**
     * Delete the strategy
     *
     * @param strategy
     */
    deleteStrategy(strategy: IStrategy): Observable<boolean> {
        return this._httpClient.delete<boolean>('api/apps/strategies', { params: { id: strategy._id } }).pipe(
            map((isDeleted: boolean) => {

                // Update the strategies
                this.getStrategies().subscribe();

                // Return the deleted status
                return isDeleted;
            })
        );
    }

    /**
     * Get strategy PnL
     *
     * @param strategyId
     */
    getPnL(strategyId: string): Observable<boolean> {
        return this._httpClient.get<boolean>(this._apiService.strategyPnL(strategyId));
    }
}
