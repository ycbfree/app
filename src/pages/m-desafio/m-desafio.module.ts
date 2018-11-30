import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MDesafioPage } from './m-desafio';
import {NgProgressModule} from "ngx-progressbar";
import { IonicStepperModule } from 'ionic-stepper';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    MDesafioPage,
  ],
  imports: [
    IonicStepperModule,
    NgProgressModule,
    ChartsModule,
    IonicPageModule.forChild(MDesafioPage),
  ],
})
export class MDesafioPageModule {}
