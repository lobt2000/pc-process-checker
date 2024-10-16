import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PcService {
  #urlApi = environment.api;
  constructor(private http: HttpClient) {}

  getPcStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.#urlApi}/api/v1/pc/status`);
  }

  getPcProcess(): Observable<unknown> {
    return this.http.get(`${this.#urlApi}/api/v1/process`);
  }

  terminateProcess(pid: number): Observable<unknown> {
    return this.http.post(`${this.#urlApi}/api/v1/process`, { pid });
  }
}
