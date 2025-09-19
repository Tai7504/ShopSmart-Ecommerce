import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header>
        <h1>ShopSmart E-commerce</h1>
      </header>
      <main>
        <app-product-listing></app-product-listing>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    main {
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'ShopSmart E-commerce';
}