import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AboutModule } from './about/about.module';
import { AppsModule } from './apps/apps.module';
import { JobsModule } from './jobs/jobs.module';
import { RuntimeAppsModule } from './runtime/runtime-apps.module';
import { SharedModule } from './shared/shared.module';
import { StreamsModule } from './streams/streams.module';
import { TasksModule } from './tasks/tasks.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedAboutService } from './shared/services/shared-about.service';
import { LayoutModule } from './layout/layout.module';
import { AuditRecordModule } from './audit/audit-record.module';


// -------------- portal imports ------------- 

import { PortalSharedModule } from "./portal-shared/portal-shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { 
    PerfectScrollbarModule, 
    PERFECT_SCROLLBAR_CONFIG, 
    PerfectScrollbarConfigInterface
  } from 'ngx-perfect-scrollbar';

import { ContentLayoutComponent } from "./portal-layouts/content/content-layout.component";
import { FullLayoutComponent } from "./portal-layouts/full/full-layout.component";

import { PortalAuthService } from './portal-shared/auth/auth.service';
import { PortalAuthGuard } from './portal-shared/auth/auth-guard.service';
import { DataflowUiComponent } from './dataflow-ui/dataflow-ui.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

// ----------------------------------------------

/**
 * Executed when the app starts up. Will load the security
 * meta information. The Observable is converted to a Promise
 * and Angular will ensure that the application will not start
 * before the Promise has resolved.
 *
 * @param authService
 */
export function init(authService: AuthService, sharedAboutService: SharedAboutService) {
  return () => {
    return authService.loadSecurityInfo(true).map(securityInfo => {
      if (securityInfo.isAuthenticated || !securityInfo.isAuthenticationEnabled) {
        sharedAboutService.loadAboutInfo();
      }
    }).toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent, //portal
    ContentLayoutComponent, DataflowUiComponent //portal
  ],
  imports: [
    AboutModule,
    AppsModule,
    AuditRecordModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JobsModule,
    RuntimeAppsModule,
    SharedModule,
    StreamsModule,
    TasksModule,
    LayoutModule,
    BsDropdownModule.forRoot(),
    PortalSharedModule, //portal
    SharedModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule
  ],
  providers: [
    {
      'provide': APP_INITIALIZER,
      'useFactory': init,
      'deps': [ AuthService, SharedAboutService ],
      'multi': true
    },
    PortalAuthService,
    PortalAuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
