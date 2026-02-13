import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.html',
})
export class Logo {
  @Input() variant: 'default' | 'small' = 'default';
  @Input() responsive: boolean = false;
}
