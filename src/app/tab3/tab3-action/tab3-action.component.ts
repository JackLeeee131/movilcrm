import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service'
import {Router, ActivatedRoute} from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-tab3-action',
  templateUrl: './tab3-action.component.html',
  styleUrls: ['./tab3-action.component.scss'],
})

export class Tab3ActionComponent implements OnInit {  
  flag:any;
  id:any;
  custom_name:any;
  custom_razon:any;

  constructor(private customerService:CustomerService, public router: Router, private activatedRoute:ActivatedRoute, private alertCtrl: AlertController, 
    public toastController: ToastController) { }

  ngOnInit() {
    this.flag = this.activatedRoute.snapshot.queryParamMap.get("flag");
    if(this.flag == 'create'){
      this.id = '';
      this.custom_name = '';
      this.custom_razon = '';
    }
    else{
      this.id = this.activatedRoute.snapshot.queryParamMap.get("id");
      this.custom_name = this.activatedRoute.snapshot.queryParamMap.get("name");
      this.custom_razon = this.activatedRoute.snapshot.queryParamMap.get("razon");
    }
  }

  async createCustomer(){
    var result = await this.customerService.createCustomer(this.custom_name, this.custom_razon);
    if(result['id']) this.createAlert();
  }

  async updateCustomer(){
    var result = await this.customerService.updateCustomer(this.id, this.custom_name, this.custom_razon);
    if(result['id']) this.updateAlert();
  }

  backToCustomers(){
    this.router.navigateByUrl('/tabs/tab3');    
  }

  async createAlert(){
    let alert = await this.alertCtrl.create({
      header: 'CREATE CUSOTMER',
      message: 'IS IT OKAY?',
      buttons: ['ok']
    });
    await alert.present();
  }

  async updateAlert(){
    const toast = await this.toastController.create({
      message: 'customer updated.',
      duration: 4000,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.backToCustomers();
          }
        }
      ]
    });
    toast.present();
  }
}

