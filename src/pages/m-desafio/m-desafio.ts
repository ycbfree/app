import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NetworksProvider} from "../../providers/networks/networks";
import { NgProgress } from 'ngx-progressbar';
import {DatabaseProvider} from "../../providers/database/database";
import swal from "sweetalert";
import {GlobalProvider} from "../../providers/global/global";
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the MDesafioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-m-desafio',
  templateUrl: 'm-desafio.html',
})
export class MDesafioPage {
  name: string;
  id: number;
  networks_list: any[] = [];
  networks_saved: any[] = [];
  networks_final: any[] = [];
  isValidLan : boolean = false;
  isValidDns : boolean = false;
  isValidHttp : boolean = false;
  isValidHttps : boolean = false;
  isEvadeLan : boolean = false;

  discovery_saved: any[] = [];



  interface: string = null;
  ip: string = null;
  gateway: string = null;
  address_dns: string;


  https_status: string = null;
  http_status: string = null;




  constructor(private navParams: NavParams, private view: ViewController,
              public navCtrl: NavController,
              public ngProgress: NgProgress,
              public networks: NetworksProvider,
              private database: DatabaseProvider,
              public global: GlobalProvider,
              public loadingCtrl: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    this.id = this.navParams.get('id');
    if(this.name == 'Descubrimiento de Activos'){
      this.getHosts(this.id);
      //this.getDiscovery();
    }
    if(this.name == 'Gestión de Vulnerabilidades'){
      this.getAllHostsByCaseID();
    }


  }

  getAllHostsByCaseID(){
    this.ngProgress.start();
    this.database.getAllHostsHostDiscovery(this.id).then((data) => {
      this.discovery_saved = Object(data);
      console.log(this.discovery_saved);

      this.ngProgress.done();
    }, (error) => {
      this.ngProgress.done();
      console.log(error);
    });

  }

  goToHost(cases_id, mac, ipv4, vendor){
    let data = {
      'cases_id': cases_id,
      'mac': mac,
      'ipv4': ipv4,
      'vendor': vendor
    };
    this.navCtrl.push("HostPage", data);

  }
  evadeLAN(){
    this.ngProgress.start();
    this.networks.checkevadeLAN()
      .subscribe(
        (data) => {
          console.log(data['result']);
          if(data['result'] == "ok"){
            swal("Exito!", "EVADE OK.", "success");
          }else{
            swal("Error!", "EVADE ERROR!", "error");
          }
          this.ngProgress.done();

        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );

  }
  checkLAN(){
    this.ngProgress.start();
    this.networks.checkLAN()
      .subscribe(
        (data) => {
          try {
            console.log(data['result']);
            if(data['result'][0]["status"] == "OK"){
              this.isValidLan = true;
              console.log(data['result'][0]["status"]);
              this.interface = data['result'][0]["interface"];
              this.ip = data['result'][0]["ip"];
              this.gateway = data['result'][0]["gateway"];

              swal("Exito!", "CONECTIVIDAD LAN OK.", "success");
            }else{
              this.isEvadeLan = true;
              swal("Ups!", "Error, Intente Evadiendo LAN.", "error");
            }
          }
          catch(e) {
            console.log(e);
            this.isEvadeLan = true;
            swal("Ups!", "Error, Intente Evadiendo LAN.", "error");
          }

          this.ngProgress.done();
        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          this.isEvadeLan = true;
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );
  }
  checkDNS(){
    this.ngProgress.start();
    this.networks.checkDNS()
      .subscribe(
        (data) => {
          console.log(data['result']);
          if(data['result'][0]["status"] == "OK"){
            this.isValidDns = true;
            this.address_dns = data['result'][0]["address"];
            swal("Exito!", "DNS OK.", "success");
          }else{
            swal("Error!", "NO DNS!", "error");
          }
          this.ngProgress.done();
        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );
  }
  checkHTTP_t(){
    this.ngProgress.start();
    this.networks.checkHTTP_t()
      .subscribe(
        (data) => {
          console.log(data['result']);
          if(data['result'][0]["status"] == "OK"){
            this.isValidHttp = true;
          }
          this.http_status = data['result'][0]["status"];

          this.ngProgress.done();
          swal("Exito!", "HTTP OK.", "success");
        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );

  }
  checkHTTPS_t(){
    this.ngProgress.start();
    this.networks.checkHTTP_t()
      .subscribe(
        (data) => {
          console.log(data['result']);
          if(data['result'][0]["status"] == "OK"){
            this.isValidHttp = true;
          }
          this.http_status = data['result'][0]["status"];

          this.ngProgress.done();
          swal("Exito!", "HTTPS OK.", "success");
        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );

  }
  finish(){
    swal("Felicidades!", "Ya Estas Dentro!", "success");
  }
  checkHTTP(){
    this.ngProgress.start();
    this.networks.checkHTTP()
      .subscribe(
        (data) => {
          console.log(data['result']);
          if(data['result'][0]["status"] == "OK"){
            this.isValidHttp = true;
            this.http_status = data['result'][0]["status"];
            swal("Exito!", "HTTP OK.", "success");
          }else{
            this.isValidHttp = false;
            this.http_status = data['result'][0]["status"];
            this.ngProgress.done();
            swal("Error!", "HTTP NO OK", "error");
          }
          this.ngProgress.done();

        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );
  }
  checkHTTPS(){
    this.ngProgress.start();
    this.networks.checkHTTPS()
      .subscribe(
        (data) => {
          console.log(data['result']);
          if(data['result'][0]["status"] == "OK"){
            this.isValidHttps = true;
          }
          this.https_status = data['result'][0]["status"];

          this.ngProgress.done();
          swal("Exito!", "HTTPS OK.", "success");
        },
        (error) => {
          console.error(error);
          this.ngProgress.done();
          swal("Ups!", "Error, intente luego!.", "error");
        }
      );
  }
  getDiscovery(){
    //this.ngProgress.start();
    this.networks.getDiscovery()
      .subscribe(
        (data) => {
          this.networks_list = data['result'];
          console.log("forEach");
          this.networks_list.forEach(item_list => {
            let found = 0;
            this.networks_saved.forEach(item_saved => {
              if((item_list.ipv4 == item_saved.ipv4) && (item_list.mac == item_saved.mac)){
                found = 1;
              }

            });
            if(found == 0){
              this.networks_saved.push(item_list);
            }
          });
          console.log("networks_list");
          console.log(this.networks_list);
          console.log("saveDiscovery");
          this.saveDiscovery(this.networks_list);
          //this.ngProgress.done();

          //console.log(data);
          //this.pService.done();
        },
        (error) => {
          console.error(error);
          //this.ngProgress.done();
        }
      );

  }

  // Query to get all hosts by case id from localdatabase
  getHosts(_id){
    this.loadingCtrl.presentWithGif1().present().then( ()=> {
      this.database.getAllHostsByCaseID(_id).then((data) => {
        this.networks_saved = Object(data);
        console.log("getHosts");
        console.log(this.networks_saved);
        this.loadingCtrl.loading.dismissAll();
      }, (error) => {
        this.loadingCtrl.loading.dismissAll();
      });
    } );








  }
  saveDiscovery(list){
    console.log(this.id);
    list.forEach( item => {
      this.ngProgress.start();
      this.database.createHost2(
        item.ipv4,
        item.mac,
        item.vendor,
        item.status,
        item.types,
        this.id).then((data) => {
          this.ngProgress.done();
        //swal("Exito!", "Guardado Correctamente!.", "success");
      }, (error) => {
          this.ngProgress.done();
        //swal("Ups!", "Error, intente luego!.", "error");
        console.log(error);
      });
    });
  }
  closeModal(){
    this.view.dismiss();
  }
/*
  CreateHost(){
    this.database.createHost("192.168.200.71", "00:00:00:00:00:00:ff:ff")
      .then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }*/

}
