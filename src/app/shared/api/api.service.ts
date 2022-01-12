import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl: string;
  private _entityUrl: string;

  constructor(private _entity: string) {
    this._baseUrl = `${environment.apiUrl}`;
    this._entityUrl = `${environment.apiUrl}/${this._entity}`;
  }

  createApi(): string {
    return `${this._entityUrl}`;
  }

  getAllApi(): string {
    return `${this._entityUrl}`;
  }

  getByIdApi(id: string): string {
    return `${this._entityUrl}/${id}`;
  }

  updateApi(id: string): string {
    return `${this._entityUrl}/${id}`;
  }

  deleteApi(id: string): string {
    return `${this._entityUrl}/${id}`;
  }

  strategyPnL(id: string): string {
    return `${this._baseUrl}/trades/strategy-pnl/${id}`;
  }
}
