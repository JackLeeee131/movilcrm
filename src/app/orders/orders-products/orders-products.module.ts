import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {OrdersProductsComponent} from '../orders-products/orders-products.component';
import { from } from 'rxjs';
import { importType } from '@angular/compiler/src/output/output_ast';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { 
        path: '', component: OrdersProductsComponent 
      }
    ])
  ],
  declarations: [ OrdersProductsComponent]
})
export class OrdersProductsModule {}
