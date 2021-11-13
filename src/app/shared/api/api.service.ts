import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl: string;

  constructor() {
    this._baseUrl = `${environment.apiUrl}`;
  }

  getTradeApi(): string{
    return `${this._baseUrl}/trades`;
  }

  createTradeApi(): string{
    return `${this._baseUrl}/trades`;
  }
}
