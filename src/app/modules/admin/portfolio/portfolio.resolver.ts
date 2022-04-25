import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PortfolioService } from './portfolio.service';

@Injectable({
    providedIn: 'root'
})
export class PortfolioResolver implements Resolve<boolean> {
    constructor(private _portfolioService: PortfolioService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._portfolioService.getData();
    }
}
