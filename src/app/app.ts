import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('chili-clothes');

  showHeader(): boolean {
    const url = this.router.url;
    return !url.includes('/login') && !url.includes('/register') && !url.includes('/dashboard') && !url.includes('/products');
  }
}
