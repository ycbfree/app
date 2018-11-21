import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { NgProgress } from 'ngx-progressbar';
import {NetworksProvider} from "../../providers/networks/networks";
import swal from "sweetalert";
import {GlobalProvider} from "../../providers/global/global";
import {MVulnerabilitiesPageModule} from "../m-vulnerabilities/m-vulnerabilities.module";
import {MVulnerabilitiesPage} from "../m-vulnerabilities/m-vulnerabilities";
import {DatabaseProvider} from "../../providers/database/database";
import { LoadingProvider } from '../../providers/loading/loading';


/**
 * Generated class for the HostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-host',
  templateUrl: 'host.html',
})
export class HostPage {

  vendor: string = null;
  cases_id: number = null;
  mac: string = null;
  ipv4: string = null;

  tunel: string = null;

  net_ports: any[] = [];
  net_vulns: any[] = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngProgress: NgProgress,
              public networks: NetworksProvider,
              public global: GlobalProvider,
              private modal: ModalController,
              private database: DatabaseProvider,
              public loadingCtrl: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.mac = this.navParams.get('mac');
    this.vendor = this.navParams.get('vendor');
    this.cases_id = this.navParams.get('cases_id');
    this.ipv4 = this.navParams.get('ipv4');
  }

  getVuln(ipv4){
    this.loadingCtrl.presentWithGif1().present().then( ()=> {
      this.networks.getVulnByIp(ipv4)
        .subscribe(
          (data) => {
            let listports = data['services'];
            let listcve = data['CVE'];
            this.net_ports =[];
            listports.forEach(item => {
              let port = item["port"];
              let countCVE = 0;
              listcve.forEach(subitem =>{
                if (port == subitem["port"]){
                  countCVE += 1;
                }

              });
              let obj = {
                "port": item["port"],
                "protocol": item["protocol"],
                "service": item["service"],
                "state": item["state"],
                "version": item["version"],
                "cantidadCVE" : countCVE
              };
              this.net_ports.push(obj);

              this.database.insertHostDiscovery(this.ipv4, parseInt(item["port"]),item["protocol"],item["state"],item["version"], this.cases_id,countCVE).then((data) => {
                console.log(data["insertId"]);
                //this.ngProgress.done();
                //swal("Exito!", "Guardado Correctamente!.", "success");
              }, (error) => {
                //this.ngProgress.done();
                //swal("Ups!", "Error, intente luego!.", "error");
                console.log(error);
              });



            });

            //this.net_ports = data['services'];
            this.net_vulns = data['CVE'];

        this.loadingCtrl.loading.dismiss();

            //console.log(data);
            //this.pService.done();
          },
          (error) => {
            console.error(error);
        this.loadingCtrl.loading.dismiss();
          }
        );

    });


  }

  showCVE(port){
    let modalObject = [];
    this.net_vulns.forEach(item => {
        if(item["port"] == port){
          //console.log(item);
          let obj = {
            "cve": item["cve"],
            "desc": item["desc"]
          };
          modalObject.push(obj);

        }
    });
    let myDataModal = {
      "port" : port,
      "result": modalObject
    };

    const myModal = this.modal.create('MVulnerabilitiesPage', myDataModal);
    myModal.present();

  }

  getDiscovery(ipv4){
    this.loadingCtrl.presentWithGif1();
    this.networks.getVulnByIp(ipv4)
    .subscribe(
      (data) => {
        this.net_vulns = data['result'];
        this.loadingCtrl.dismiss();
        //console.log(data);
        //this.pService.done();
      },
      (error) => {
        console.error(error);
        this.loadingCtrl.dismiss();
      }
    );
  }

  _dnsResolver(){
    this.loadingCtrl.presentWithGif1();
    this.networks.dnsResolver(this.ipv4)
      .subscribe(
        (data) => {
          if(data['result'][0]["status"] == "OK"){
            let address_dns_resolver = data['result'][0]["address"];
            swal("Exito!", "DNS RESOLVER OK EN "+ address_dns_resolver + ".", "success");
            this._dnsTunneling();
          }else{
            swal("Error!", "NO DNS!", "error");
          }
          this.loadingCtrl.dismiss();
        },
        (error) => {
          console.error(error);
          swal("Ups!", "Error, intente luego!.", "error");
          this.loadingCtrl.dismiss();


        }
      );
  }

  _dnsTunneling(){
    this.loadingCtrl.presentWithGif1();
    this.networks.dnsTunneling()
      .subscribe(
        (data) => {
          if(data['result'] == "ok"){
            this.global.httpTunnelingFlag = true;

            swal("Exito!", "DNS TUNNELING OK", "success");
          }else{
            this.networks.dnsTunneling()
              .subscribe(
                (data) => {
                if(data['result'] == "ok"){
                  this.global.httpTunnelingFlag = true;
                  swal("Exito!", "DNS TUNNELING OK", "success");
                }else{
                  swal("Error!", "NO DNS TUNNELING!", "error");
                }
              }
            );
          }
          this.loadingCtrl.dismiss();
        },
        (error) => {
          console.error(error);
          swal("Ups!", "Error, intente luego!.", "error");
          this.loadingCtrl.dismiss();
        }
      )
  }


}
