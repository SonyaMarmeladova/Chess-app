import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';

@NgModule({
  imports: [
    CommonModule,
    AnalysisRoutingModule
  ],
  declarations: [AnalysisComponent]
})
export class AnalysisModule { }