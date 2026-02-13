import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastNotificationComponent } from '../components/toast-notification/toast-notification';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Muestra un mensaje de éxito
   */
  success(message: string, duration: number = 3000) {
    this.show(message, 'success', duration);
  }

  /**
   * Muestra un mensaje de error
   */
  error(message: string, duration: number = 4000) {
    this.show(message, 'error', duration);
  }

  /**
   * Muestra un mensaje de advertencia
   */
  warning(message: string, duration: number = 3500) {
    this.show(message, 'warning', duration);
  }

  /**
   * Muestra un mensaje informativo
   */
  info(message: string, duration: number = 3000) {
    this.show(message, 'info', duration);
  }

  /**
   * Método privado para mostrar el toast usando un componente personalizado con Tailwind
   */
  private show(message: string, type: ToastType, duration: number) {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message, type },
      panelClass: ['custom-toast-container']
    };

    this.snackBar.openFromComponent(ToastNotificationComponent, config);
  }

  /**
   * Cierra todos los toasts activos
   */
  dismiss() {
    this.snackBar.dismiss();
  }
}
