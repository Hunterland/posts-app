// Importa o ApplicationConfig e provideZoneChangeDetection do Angular Core, e provideRouter do Angular Router
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importa as rotas definidas no arquivo 'app.routes'
import { routes } from './app.routes';

// Define a configura��o da aplica��o
export const appConfig: ApplicationConfig = {
  // Define os provedores de servi�os da aplica��o,
  // incluindo a configura��o da detec��o de mudan�a de zona e as rotas do aplicativo
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
