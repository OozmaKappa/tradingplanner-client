import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl: string;

  constructor(private _entity: string) {
    this._baseUrl = `${environment.apiUrl}/${this._entity}`;
  }

  createApi(): string {
    return `${this._baseUrl}`;
  }

  getAllApi(): string {
    return `${this._baseUrl}`;
  }

  getByIdApi(id: string): string {
    return `${this._baseUrl}/${id}`;
  }

  updateApi(id: string): string {
    return `${this._baseUrl}/${id}`;
  }

  deleteApi(id: string): string {
    return `${this._baseUrl}/${id}`;
  }
}
