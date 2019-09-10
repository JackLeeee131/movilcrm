import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersActionComponent } from './orders-action.component';
import { from } from 'rxjs';
import { importType } from '@angular/compiler/src/output/output_ast';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', component: OrdersActionComponent 
      }
    ])
  ],
  declarations: [OrdersActionComponent]
})
export class OrdersActionModule {}
