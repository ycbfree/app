import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MDesafioPage } from './m-desafio';
import {NgProgressModule} from "ngx-progressbar";
import { IonicStepperModule } from 'ionic-stepper';

@NgModule({
  declarations: [
    MDesafioPage,
  ],
  imports: [
    IonicStepperModule,
    NgProgressModule,
    IonicPageModule.forChild(MDesafioPage),
  ],
})
export class MDesafioPageModule {}
