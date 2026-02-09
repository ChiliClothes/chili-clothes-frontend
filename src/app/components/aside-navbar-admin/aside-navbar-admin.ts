import { Component } from '@angular/core';
import { Logo } from '../logo/logo';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-aside-navbar-admin',
  imports: [Logo, RouterLink, RouterLinkActive],
  templateUrl: './aside-navbar-admin.html',
})
export class AsideNavbarAdmin {
  dashboardLink = '/dashboard';
  productsLink = '/products';
}
