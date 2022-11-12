import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AccountRoutingModule} from "./account-routing.module";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SocialLoginModule
  ],
  providers:[ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '503653920031-kj2bqusrbsu9qi3g16d12p91gmut1h79.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('648288233404640')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }]
})
export class AccountModule { }
