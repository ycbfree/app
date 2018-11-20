import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicStepperComponent } from "ionic-stepper";
import { IonicStepperModule } from 'ionic-stepper';
import {MDesafioPage} from "../m-desafio/m-desafio";
import {ModalController} from "ionic-angular";

/**
 * Generated class for the CasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cases',
  templateUrl: 'cases.html',
})
export class CasesPage {
  id: string;
  created_time: string;
  name: string;
  description: string;
  myParam: string;




  constructor(public navCtrl: NavController, params: NavParams, private modal: ModalController) {
    this.id = params.get('id');
    this.created_time = params.get('created_time');
    this.name = params.get('name');
    this.description = params.get('description');



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesPage');

  }
  goReport(){
    console.log("do report");
  }

  openModal(option){
    let myDataModal = {};
    switch (option){
      case 1: {
        myDataModal = {
          'name' : "Evasión de Red",
          'id'  : this.id
        };
        break;
      }
      case 2: {
        myDataModal = {
          'name' : "Descubrimiento de Activos",
          'id'  : this.id
        };
        break;
      }
      case 3: {
        myDataModal = {
          'name' : "Gestión de Vulnerabilidades",
          'id'  : this.id
        };
        break;
      }

    }
    const myModal = this.modal.create('MDesafioPage', myDataModal);
    myModal.present();
  }

}
