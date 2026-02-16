import { Component, inject } from '@angular/core';
import { Logo } from '../logo/logo';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aside-navbar-admin',
  imports: [Logo, RouterLink, RouterLinkActive],
  templateUrl: './aside-navbar-admin.html',
})
export class AsideNavbarAdmin {
  dashboardLink = '/dashboard';
  productsLink = '/products';
  authService = inject(AuthService);
}
