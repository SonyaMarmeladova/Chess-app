import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppUserService } from './app-user.service';
import { WorkerService } from './app-worker.service';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { userProviderFactory } from './app-user-provider.factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CoreModule
  ],
  providers: [
    AppUserService,
    {
      provide: APP_INITIALIZER,
      useFactory: userProviderFactory,
      deps: [ AppUserService ],
      multi: true
    },
    WorkerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
