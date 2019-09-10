import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CustomerService } from '../services/customer.service';
import {Router} from '@angular/router';
//import { NetworkService, ConnectionStatus } from './network.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public searchTerm: string = "";
  as_clientes = [];
  data:any;
  items = [];
  count: number = 0;
  
  constructor(
    public customerService: CustomerService,
    private plt: Platform,
    public loadingController: LoadingController,
    public router: Router
    ) { 
    }
 
  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  
  }
  
  async localData(refresh = false, refresher?) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    await loading.present();    
    this.customerService.localClientes(refresh).subscribe(res => {
      this.as_clientes = res;
      this.items = res;
      
      loading.dismiss();
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

  async loadData(refresh = false, refresher?) {
    //this.items = [];
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    await loading.present();    
    this.customerService.downloadClientes(refresh).subscribe(res => {
      this.as_clientes = res;
      this.items = res;
     
      loading.dismiss();
      if (refresher) {
        refresher.target.complete();
      }
    });
  }
 
  setFilteredItems() {
    if(this.searchTerm) {
      this.items = this.as_clientes.filter((item) => {
        return JSON.stringify(item.name).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    } else {
      this.items = this.as_clientes;
    }
  }

  updateUser(id) {
    this.customerService.updateUser(id, {name: 'Simon', job: 'CEO'}).subscribe();
  }

  createCustomer(){
    this.router.navigateByUrl(this.router.url+'/action?flag=create');
  }
  updateCustomer(id, name, razon){
    this.router.navigateByUrl(this.router.url+'/action?flag=update&id='+id+"&name="+name+'&razon='+razon);
  }
}