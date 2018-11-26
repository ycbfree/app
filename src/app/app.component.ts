import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {DatabaseProvider} from "../providers/database/database";
import {SQLite} from "@ionic-native/sqlite";

import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = null;

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen,
              public sqlite: SQLite,
              public tasksService: DatabaseProvider
              ) {
    platform.ready().then(() => {
      moment.locale('es');

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.createDatabase();
      splashScreen.hide();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this.tasksService.setDatabase(db);
        return this.tasksService.createTable();
      })
      .then(() =>{
        this.splashScreen.hide();
        this.rootPage = 'TabPage';
      })
      .catch(error =>{
        console.error(error);
      });
  }
}

