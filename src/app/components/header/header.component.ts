import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

import { Logo } from '../logo/logo';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule, Logo],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    themeService = inject(ThemeService);
    cartService = inject(CartService);
    authService = inject(AuthService);
}
