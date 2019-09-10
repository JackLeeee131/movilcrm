import { OfflineManagerService } from './offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";

const API_STORAGE_KEY = 'specialkey';
// const API_URL = 'http://localhost:9999/movilcrm';
const API_URL = 'https://phoenixsampras.pagekite.me/movilcrm';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, 
    private networkService: NetworkService, 
    private storage: Storage, 
    private offlineManager: OfflineManagerService
    ) { }

  downloadOrders(forceRefresh: boolean = false): Observable<any[]> {
    let as_token = '123';
    let url = `${API_URL}/orders?as_token=${as_token}`;
    // Return real API data and store it locally
    return this.http.get(url).pipe(
      map(res => res['orders']),
      tap(res => {
        console.info("Online orders:" + res);
        this.setLocalData('orders', res);
      })
    )
  }

  localOrders(forceRefresh: boolean = false): Observable<any[]> {
    // Return the cached data from Storage
    console.info("Offline:" + this.getLocalData('orders'));
    return from(this.getLocalData('orders'));
  }

  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
 
  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

}
