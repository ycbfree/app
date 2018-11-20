import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {PerfilPage} from "../perfil/perfil";
import {SettingPage} from "../setting/setting";


@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }


  tabRoot1 = HomePage;
  tabRoot2 = SettingPage;
}
