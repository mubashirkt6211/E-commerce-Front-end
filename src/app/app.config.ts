import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),  
    provideHttpClient(withFetch()), 
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    })
  ]
};
