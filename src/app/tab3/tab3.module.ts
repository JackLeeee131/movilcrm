import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import {Tab3ActionComponent} from './tab3-action/tab3-action.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', component: Tab3Page 
      },
      { 
        path: 'action', component: Tab3ActionComponent 
      }
    ])
  ],
  declarations: [Tab3Page, Tab3ActionComponent, ]
})
export class Tab3PageModule {}
