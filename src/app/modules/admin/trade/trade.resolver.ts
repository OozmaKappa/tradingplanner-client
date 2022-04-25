import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TradeService } from './trade.service';

@Injectable({
    providedIn: 'root'
})
export class TradeResolver implements Resolve<boolean> {
    constructor(private _tradeService: TradeService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._tradeService.getTrades();
    }
}

// import { Injectable } from '@angular/core';
// import {
//     Router, Resolve,
//     RouterStateSnapshot,
//     ActivatedRouteSnapshot
// } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { PortfolioService } from './portfolio.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class PortfolioResolver implements Resolve<boolean> {
//     constructor(private _portfolioService: PortfolioService) {

//     }
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//         return this._portfolioService.getData();
//     }
// }
