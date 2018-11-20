import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasesPage } from './cases';

@NgModule({
  declarations: [
    CasesPage,
  ],
  imports: [
    IonicPageModule.forChild(CasesPage),
  ],
})
export class CasesPageModule {}
