import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-products',
  templateUrl: './orders-products.component.html',
  styleUrls: ['./orders-products.component.scss'],
})
export class OrdersProductsComponent implements OnInit {

  searchTerm: any = "";
  product:any;
  products:any = [];
  
  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router,
  ) { }

  ngOnInit() {}

  // addProduct(){
  //   this.router.navigateByUrl(this.router.url + '/action?flag=create');
  // }

}
