import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'toast-notification.html',
})
export class ToastNotificationComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: string },
    public snackBarRef: MatSnackBarRef<ToastNotificationComponent>
  ) { }

  get containerClasses(): string {
    const baseClasses = '';
    const typeClasses: Record<string, string> = {
      success: 'bg-emerald-500 border-emerald-600 shadow-emerald-500/20',
      error: 'bg-rose-500 border-rose-600 shadow-rose-500/20',
      warning: 'bg-amber-500 border-amber-600 shadow-amber-500/20',
      info: 'bg-sky-500 border-sky-600 shadow-sky-500/20'
    };
    return `${baseClasses} ${typeClasses[this.data.type] || typeClasses['info']}`;
  }
}
