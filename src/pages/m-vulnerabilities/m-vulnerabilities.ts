import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the MVulnerabilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-m-vulnerabilities',
  templateUrl: 'm-vulnerabilities.html',
})
export class MVulnerabilitiesPage {

  port: number;
  list_cve: any[] = [];
  cantidad: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private view: ViewController) {
  }

  ionViewDidLoad() {
    this.port = this.navParams.get('port');
    this.list_cve = this.navParams.get('result');
    this.cantidad = this.list_cve.length;
    //console.log("result");
    //console.log(this.list_cve);
  }

  openUrl(cve){ window.open('https://cve.mitre.org/cgi-bin/cvename.cgi?name='+cve, '_system'); }

  closeModal(){
    this.view.dismiss();
  }


}
