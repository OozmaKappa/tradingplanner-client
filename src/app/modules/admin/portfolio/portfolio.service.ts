import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'app/shared/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private _portfolioData: BehaviorSubject<any> = new BehaviorSubject(null);
    private _portfolioPnLData: BehaviorSubject<any> = new BehaviorSubject(null);
    private _apiService: ApiService;

    constructor(private _httpClient: HttpClient) {
        this._apiService = new ApiService('portfolio');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get pnlData$(): Observable<any> {
        return this._portfolioPnLData.asObservable();
    }

    get portfolioData$(): Observable<any> {
        return this._portfolioData.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get PnL data
     */
    getPnLData(): Observable<any> {
        return this._httpClient.get(this._apiService.getPnL()).pipe(
            tap((response: any) => {
                this._portfolioPnLData.next(response);
            })
        );
    }

    getPortfolioData(): Observable<any> {
        return this._httpClient.get(this._apiService.getAllApi()).pipe(
            tap((response: any) => {
                this._portfolioData.next(response);
            })
        );
    }

    // private _setChartData(realised: { [key: string]: number }, unrealised: { [key: string]: number }): void {
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
}
