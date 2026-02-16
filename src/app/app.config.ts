import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, SOCIAL_AUTH_CONFIG } from '@abacritt/angularx-social-login';


import { routes } from './app.routes';
import { productsInterceptor } from './interceptors/products-interceptor';

// TODO: Replace with your actual Facebook App ID from https://developers.facebook.com/
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '229584976685-umdbskt7m223taiu5lft8h5j97ug94vm.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(FACEBOOK_APP_ID)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ]
};
