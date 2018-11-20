import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NetworksProvider } from '../providers/networks/networks';
import { HttpClientModule } from '@angular/common/http';
import {PerfilPage} from "../pages/perfil/perfil";
import { DatabaseProvider } from '../providers/database/database';
import { SQLite} from "@ionic-native/sqlite";


import {SettingPage} from "../pages/setting/setting";
import { IonicStepperModule } from 'ionic-stepper';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgProgressModule } from 'ngx-progressbar';
import { GlobalProvider } from '../providers/global/global';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    SettingPage
  ],
  imports: [
    NgProgressModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStepperModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworksProvider,
    DatabaseProvider,
    SQLite,
    GlobalProvider
  ]
})
export class AppModule {}
