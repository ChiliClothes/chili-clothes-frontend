import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocialAuthServiceConfig, GoogleLoginProvider, SOCIAL_AUTH_CONFIG } from '@abacritt/angularx-social-login';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
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
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ]
};
