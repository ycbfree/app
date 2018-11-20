import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  private todo : FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  logForm(){
    let name = this.todo.value.title.trim();
    let description = this.todo.value.description.trim();
    console.log(this.todo.value);
    this.database.createCase(name,description)
      .then((data)=> {
        swal("Exito!", "Caso Creado correctamente!.", "success");
        this.navCtrl.pop();
        //this.navCtrl.goToRoot();
        //this.start();
      }, (error) => {
        console.log(error);
      });
  }



  GetAllHost(){
    this.database.getAllNetworks()
      .then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

  GetAllCases(){
    this.database.getAllCases()
      .then((data) => {
        console.log(data);

      }, (error) => {
        console.log(error);
      });
  }

  start(){
    console.log("Start clicked");
    this.GetAllHost();
    this.GetAllCases();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
