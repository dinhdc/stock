import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { isAuthenticated } from './shared/guards/is-authenticated.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeadersInterceptor } from './shared/interceptors/header.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    DashboardModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [
    isAuthenticated,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
