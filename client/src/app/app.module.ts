import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {LoginPageComponent} from './login-page/login-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import {TokenInterseptor} from "./shared/classes/token.interseptor";



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:TokenInterseptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
