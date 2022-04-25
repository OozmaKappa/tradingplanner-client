import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'app/shared/api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
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
    get data$(): Observable<any> {
        return this._data.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any> {
        console.log("Getting data for the portfolio")
        return this._httpClient.get(this._apiService.getPnL()).pipe(
            tap((response: any) => {
                this._data.next(response);
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
