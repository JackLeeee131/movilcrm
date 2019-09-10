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
export class CustomerService {
  public items: any = []; 
  public resultados: any = []; 
  public filteredItems: any = [];

  constructor(private http: HttpClient, 
    private networkService: NetworkService, 
    private storage: Storage, 
    private offlineManager: OfflineManagerService
    ) { }

  downloadClientes(forceRefresh: boolean = false): Observable<any[]> {
    let as_token = '123';
    let url = `${API_URL}/customers?as_token=${as_token}`;
    // Return real API data and store it locally
    return this.http.get(url).pipe(
      map(res => res['clientes']),
      tap(res => {
        console.info("Online clientes:" + res);
        this.setLocalData('clientes', res);
      })
    )
  }

  localClientes(forceRefresh: boolean = false): Observable<any[]> {
    // Return the cached data from Storage
    console.info("Offline:" + this.getLocalData('clientes'));
    return from(this.getLocalData('clientes'));
  }
  
  getClientes(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      console.info("Offline:" + this.getLocalData('clientes'));
      return from(this.getLocalData('clientes'));
    } else {
      // Just to get some "random" data
      let as_token = '123';
      let url = `${API_URL}/customers?as_token=${as_token}`;
      // Return real API data and store it locally
      return this.http.get(url).pipe(
        map(res => res['clientes']),
        tap(res => {
          console.info("Online clientes:" + res);
          this.setLocalData('clientes', res);
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

  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
 
  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  createCustomer(custom_name, custom_razon){
    console.log(custom_name)
    var url = 'https://phoenixsampras.pagekite.me/movilcrm/customers/create?as_token=123&name='+custom_name+'&razon_social='+custom_razon;
    return this.http.get(url).toPromise();
  }

  updateCustomer(id, custom_name, custom_razon){
    var url  ='https://phoenixsampras.pagekite.me/movilcrm/customers/update/'+id+'?as_token=123&name='+custom_name+'&razon_social='+custom_razon;
    return this.http.get(url).toPromise();
  }
}
