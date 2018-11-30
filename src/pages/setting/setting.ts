import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from "sweetalert";
import {LoadingProvider} from "../../providers/loading/loading";
import {NetworksProvider} from "../../providers/networks/networks";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public networks: NetworksProvider,
              public loadingCtrl: LoadingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  stopServices(opcion){
    this.loadingCtrl.presentWithGif1().present().then( ()=> {
      this.networks.stop_services(opcion)
        .subscribe(
          (data) => {
            console.log(data['result']);
            if (data['result'] == "OK") {
              swal("Exito!", "Servicios Detenidos.", "success");
            } else {

              this.loadingCtrl.loading.dismissAll();
              swal("Error!", "Volver a intentar", "error");
            }
            this.loadingCtrl.loading.dismissAll();

          },
          (error) => {
            console.error(error);
            this.loadingCtrl.loading.dismissAll();
            swal("Ups!", "Error, intente luego!.", "error");
          }
        );
    });
  }

}
