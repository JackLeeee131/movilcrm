import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { OrdersService } from '../services/orders.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public searchTerm: string = "";
  as_orders = [];
  items = [];

  constructor(
    public ordersService: OrdersService,
    private plt: Platform,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  }

  async loadData(refresh = false, refresher?) {
    //this.items = [];
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    await loading.present();    
    this.ordersService.downloadOrders(refresh).subscribe(res => {
      this.as_orders = res;
      this.items = res;
      console.log('here--------', this.items[0])
      loading.dismiss();
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

  setFilteredItems() {
    if(this.searchTerm) {
      this.items = this.as_orders.filter((item) => {
        return JSON.stringify(item.name).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    } else {
      this.items = this.as_orders;
    }
  }

  createOrder(){
    this.router.navigateByUrl(this.router.url + '/action');
  }

}
