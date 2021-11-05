import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {from} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    private _data2: BehaviorSubject<any> = new BehaviorSubject(null);


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }
    get data2$(): Observable<any>
    {
        return this._data2.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
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
    getData2()
    {
        return this._httpClient.get('https://tranquil-bastion-48091.herokuapp.com/https://trading-planner-eqm52ybela-uc.a.run.app/trades');
    }
}
