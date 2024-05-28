import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
  ],
  template: `
    <nav class="bg-blue-500 p-4 text-white">
      <h1 class="tex-left">Aplicação de Posts e Comentários</h1>
    </nav>
    <div class="container mx-auto mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-app';
}
