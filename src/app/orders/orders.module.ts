import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { OrdersActionComponent } from './orders-action/orders-action.component';
import { from } from 'rxjs';
import { importType } from '@angular/compiler/src/output/output_ast';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', component: OrdersComponent 
      },
      { 
        path: 'action', component: OrdersActionComponent 
      }
    ])
  ],
  declarations: [OrdersComponent, OrdersActionComponent]
})
export class OrdersPageModule {}
