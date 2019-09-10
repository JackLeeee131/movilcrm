import { OfflineManagerService } from './offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
 
const API_STORAGE_KEY = 'specialkey';
// const API_URL = 'http://localhost:9999/movilcrm';
const API_URL = 'https://phoenixsampras.pagekite.me/movilcrm';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public items: any = []; 

  constructor(private http: HttpClient, private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineManagerService) { 
  }
 
  getProducts(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      console.info("Offline:" + this.getLocalData('productos'));
      return from(this.getLocalData('productos'));
    } else {
      // Just to get some "random" data
      let as_token = '123';
      let url = `${API_URL}/productos?as_token=${as_token}`;
      // Return real API data and store it locally
      return this.http.get(url).pipe(
        map(res => res['productos']),
        tap(res => {
          console.info("Online productos:" + res);
          this.setLocalData('productos', res);
        })
      )
    }
  }
 
  updateUser(user, data): Observable<any> {
    let url = `${API_URL}/login/${user}`;
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.offlineManager.storeRequest(url, 'PUT', data));
    } else {
      return this.http.put(url, data).pipe(
        catchError(err => {
          this.offlineManager.storeRequest(url, 'PUT', data);
          throw new Error(err);
        })
      );
    }
  }

  filterItems(searchTerm) {
    this.items = (this.getLocalData('productos'));
    return this.items.filter(item => {
      return JSON.stringify(item.name).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
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
