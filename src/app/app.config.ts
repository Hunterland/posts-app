// Importa o ApplicationConfig e provideZoneChangeDetection do Angular Core, e provideRouter do Angular Router
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importa as rotas definidas no arquivo 'app.routes'
import { routes } from './app.routes';

// Define a configuração da aplicação
export const appConfig: ApplicationConfig = {
  // Define os provedores de serviços da aplicação,
  // incluindo a configuração da detecção de mudança de zona e as rotas do aplicativo
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
