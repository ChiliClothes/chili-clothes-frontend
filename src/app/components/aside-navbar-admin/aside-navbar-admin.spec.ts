import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideNavbarAdmin } from './aside-navbar-admin';

describe('AsideNavbarAdmin', () => {
  let component: AsideNavbarAdmin;
  let fixture: ComponentFixture<AsideNavbarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideNavbarAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideNavbarAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
