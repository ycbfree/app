import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NetworksProvider } from '../../providers/networks/networks';
import {DatabaseProvider} from "../../providers/database/database";
import swal from "sweetalert";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any[] = [];
  networks_list: any[] = [];
  all_cases: any[] = [];
  ssid : string ;
  public storedata = [];
  myParam: string = 'sssssss';
  constructor(public navCtrl: NavController,
              public networks: NetworksProvider,
              private database: DatabaseProvider) {


  }

  getDiscovery(){
    this.networks.getDiscovery()
      .subscribe(
        (data) => {
          this.networks_list = data['result'];
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  deleteCase(case_id){
    swal({
      title: "Estas Seguro?",
      text: "Una vez eliminado no podras vovler a recuperarlo!",
      icon: "warning",
      dangerMode: true,
      buttons: ['Cancel', 'Ok']
    }).then((willDelete) => {
        if (willDelete) {
          this.database.deleteCase(case_id).then((data) => {
            this.GetAllCases();

          }, (error) => {
            console.log(error);
          });
          swal("Poof! Eliminado Correctamente!", {
            icon: "success",
          });
        }

        /*else {
          swal("Your imaginary file is safe!");
        }*/
      });

  }

  GetAllCases(){
    this.database.getAllCases().then((data) => {
      // id, created_time, name, description
        this.all_cases = Object(data);
        console.log(this.all_cases);

      }, (error) => {
        console.log(error);
      });
  }

  ionViewDidLoad(){
    this.ssid = "Asus";
  }

  ionViewDidEnter() {
    this.GetAllCases();
    //this.getDiscovery();
  }

  goStart(){
    this.navCtrl.push("StartPage");
  }

  goToCase(id, created_time, name, description){
    let data = {
      'id': id,
      'created_time': created_time,
      'name': name,
      'description': description
    };
    this.navCtrl.push("CasesPage", data);
  }

}
