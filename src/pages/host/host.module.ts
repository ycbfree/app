import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostPage } from './host';
import {NgProgressModule} from "ngx-progressbar";

@NgModule({
  declarations: [
    HostPage,
  ],
  imports: [
    NgProgressModule,
    IonicPageModule.forChild(HostPage),
  ],
})
export class HostPageModule {}
