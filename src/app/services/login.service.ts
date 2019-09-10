import { OfflineManagerService } from './offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
 
const API_STORAGE_KEY = 'specialkey';
const API_URL = 'http://localhost:12000/movilcrm';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public usuario = '';
  public as_usuario = '';
  public as_password = '';
  public as_suspendido = '';
  public as_token = '';

  constructor(private http: HttpClient, private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineManagerService) { }
 
  getUsers(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      console.info("Offline:" + this.getLocalData('login'));
      return from(this.getLocalData('login'));
    } else {
      // Just to get some "random" data
      let as_usuario = 'admin';
      let as_password = '123456';
      let url = `${API_URL}/login?as_usuario=${as_usuario}&as_password=${as_password}`;
      // Return real API data and store it locally
      return this.http.get(url).pipe(
        map(res => res['user']),
        tap(res => {
          console.info("Online:" + res);
          this.setLocalData('login', res);
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
}
