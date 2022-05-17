import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor() { }

    calculateRelativeDevelopment(from: number, to: number): number {
        if (!from) {
            throw new Error('Attribute \'from\' cannot be 0 or NaN!');
        }
        return Math.round(((to - from) / Math.abs(from)) * 100);
    }
    calculatePercentage(base: number, data: number): number {
        if (!base) {
            throw new Error('Attribute \'base\' cannot be 0 or NaN!');
        }
        return Math.round((data / Math.abs(base) + Number.EPSILON) * 100);
    }
}
