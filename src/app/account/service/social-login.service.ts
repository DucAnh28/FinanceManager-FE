import { Injectable } from '@angular/core';
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  constructor(private authService :SocialAuthService) { }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (data) => {
        console.log(data)
      }
    );
  }

}
