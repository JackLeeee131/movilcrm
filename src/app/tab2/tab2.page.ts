import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public searchTerm: string = "";
  as_productos = [];
  data:any;
	items = [];
  count: number = 0;
  
  constructor(
    public productService: ProductService,
    private plt: Platform,
    public loadingController: LoadingController
    ) { 
      // this.loadData(true);

      // for (let f = 0; f < 5; f++) {
      //   this.items.push(this.as_productos[this.count]);
      //   console.log(this.as_productos[this.count]);
      //   this.count++
      // }
    }
 
  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
      // for (let f = 0; f < 5; f++) {
      //   this.items.push(this.as_productos[this.count]);
      //   console.log(this.as_productos[this.count]);
      //   this.count++
      // }      
    });
  }
  
  async loadData(refresh = false, refresher?) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    await loading.present();    
    this.productService.getProducts(refresh).subscribe(res => {
      this.items = res;
      this.as_productos = res;
      console.info('1111111111111', this.as_productos);
      loading.dismiss();
      if (refresher) {

        refresher.target.complete();
      }
    });
  }

  setFilteredItems() {
    if(this.searchTerm) {
      this.as_productos = this.items.filter((item) => {
        return JSON.stringify(item.name).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    } else {
      this.as_productos = this.items;
    }
    
    // console.log('test', this.items);
  }

  updateUser(id) {
    this.productService.updateUser(id, {name: 'Simon', job: 'CEO'}).subscribe();
  }

  // doInfinite(infiniteScroll) {
	// 	setTimeout(() => {
	// 		for (let f = 0; f < 5; f++) {
  //       this.items.push(this.as_productos[this.count]);
  //       console.log(this.as_productos[this.count]);
        
	// 			this.count++
  //     }
  //     console.log(this.items)
  //     infiniteScroll.complete();
  //   }, 500);
	// }

}