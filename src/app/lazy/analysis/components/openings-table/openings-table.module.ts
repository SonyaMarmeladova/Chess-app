import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonPaginatorModule } from '@shared/components/common-paginator/common-paginator.module';
import { CommonTableModule } from '@shared/components/common-table/common-table.module';
import { OpeningsTableComponent } from './openings-table.component';

@NgModule({
  imports: [
    CommonModule,
    CommonTableModule,
    CommonPaginatorModule
  ],
  declarations: [
    OpeningsTableComponent
  ],
  exports: [
    OpeningsTableComponent
  ]
})
export class OpeningsTableModule { }
