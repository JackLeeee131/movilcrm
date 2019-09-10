import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Platform } from '@ionic/angular';
import { CustomerService } from '../../services/customer.service';
import { PricelistsService } from '../../services/pricelists.service';

@Component({
  selector: 'app-orders-action',
  templateUrl: './orders-action.component.html',
  styleUrls: ['./orders-action.component.scss'],
})
export class OrdersActionComponent implements OnInit {
  flag:any;
  id:any;
  public searchTerm: string = "";
  custom_name:any;
  as_clientes = [];
  items = [];
  asPrice = [];
  searchCustomers: any = [];

  custom_razon:any;

  constructor( 
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    public customerService: CustomerService,
    private plt: Platform,
    public pricelistsService: PricelistsService,
    public loadingController: LoadingController,

    ) 
    { }

  ngOnInit() {
     
        this.plt.ready().then(() => {
          this.loadData(true);
        });
    
      
   
    
      this.id = '';
      this.custom_name = '';
      this.custom_razon = '';
    
  }

  async loadData(refresh = false, refresher?) {
    
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


  backToCustomers(){
    this.router.navigateByUrl('tabs/orders');
  }

	customerSearch() {
		
    if(this.searchTerm) {
      this.items = this.as_clientes.filter((item) => {
        return JSON.stringify(item.name).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    } else {
      this.items = this.as_clientes;
    }
  }
  
  chooseCustomer(item: any) {
     this.custom_name = item;
  }
  destroyItem(){
    console.log('good')
   
      this.items = [];
    
  }

  createOrder(){
     this.pricelistsService.localPricelists().subscribe(res=>{
      this.asPrice = res;
      console.log('pricelist',this.asPrice);
    });

  }
  
  addProduct(){
    this.router.navigateByUrl(this.router.url + '/addProduct');
  }

}
