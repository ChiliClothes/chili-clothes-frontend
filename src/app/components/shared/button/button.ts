import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() clicked = new EventEmitter<void>();

  baseClasses =
    'px-4 py-2 rounded-lg font-semibold transition-all duration-200';

  variantClasses: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  get classes(): string {
    return `
      ${this.baseClasses}
      ${this.variantClasses[this.variant]}
      ${this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;
  }

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
