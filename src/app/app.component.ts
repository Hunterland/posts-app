// Importa o decorador Component do Angular Core e RouterModule do Angular Router
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Decoração do componente com metadados, incluindo seletores, imports de módulos, template e estilos
@Component({
  selector: 'app-root', // Seletor do componente
  standalone: true, // Propriedade personalizada que pode ser usada para fins específicos
  imports: [
    RouterModule, // Módulo importado para funcionamento do componente
  ],
  template: `
    <!-- Navegação da aplicação com barra superior azul -->
    <nav class="bg-blue-500 p-4 text-white">
      <!-- Título da aplicação à esquerda -->
      <h1 class="tex-left">Aplicação de Posts e Comentários :D</h1>
    </nav>
    <!-- Div container para centralizar o conteúdo e adicionar margem superior -->
    <div class="container mx-auto mt-4">
      <!-- Outlet de roteamento para renderizar os componentes dinamicamente -->
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css'] // Caminho dos estilos CSS do componente
})
export class AppComponent { // Declaração da classe do componente
  title = 'angular-crud-app'; // Título da aplicação
}
