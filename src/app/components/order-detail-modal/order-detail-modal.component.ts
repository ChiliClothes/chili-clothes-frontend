
import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Order, OrderItem } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail-modal',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" (click)="close()"></div>

      <!-- Modal Panel -->
      <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 class="font-display text-xl font-bold text-slate-800 uppercase tracking-wide">
              Order #{{ order?.id }}
            </h2>
            <p class="text-sm text-slate-500 font-medium">
              Placed on {{ (order?.createdAt || order?.orderDate) | date:'mediumDate' }}
            </p>
          </div>
          <button (click)="close()" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
            <span class="material-icons">close</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto custom-scrollbar">
          
          <!-- Loading State -->
          <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-12 text-slate-400">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E21D1D] mb-4"></div>
            <p class="text-sm font-medium">Loading order details...</p>
          </div>

          <!-- Content State -->
          <div *ngIf="!isLoading && order" class="space-y-8">
            
            <!-- Items List -->
            <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="material-icons text-sm">inventory_2</span>
                Items ({{ (order.orderItems || order.items)?.length || 0 }})
              </h3>
              
              <div class="space-y-4">
                <div *ngFor="let item of (order.orderItems || order.items)" class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-colors">
                  <!-- Product Image Placeholder -->
                  <div class="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img *ngIf="item.product?.imageUrl" [src]="item.product!.imageUrl" alt="Product" class="w-full h-full object-cover">
                    <span *ngIf="!item.product?.imageUrl" class="material-icons text-slate-300 text-2xl">checkroom</span>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-slate-800 truncate">{{ item.product?.name || item.productName || 'Product #' + item.productId }}</h4>
                    <p class="text-sm text-slate-500">Qty: {{ item.quantity }}</p>
                  </div>
                  
                  <div class="text-right">
                    <p class="font-bold text-slate-800">{{ item.price | currency }}</p>
                    <p class="text-xs text-slate-400">Total: {{ (item.price * item.quantity) | currency }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Summary</h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span class="font-medium">{{ (order.total || order.totalAmount) | currency }}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span class="font-medium text-green-600">Free</span>
                </div>
                <div class="h-px bg-slate-200 my-2"></div>
                <div class="flex justify-between text-lg font-bold text-slate-800">
                  <span>Total</span>
                  <span>{{ (order.total || order.totalAmount) | currency }}</span>
                </div>
              </div>
            </div>

             <!-- Status Badge -->
             <div class="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                 <span class="text-sm font-bold text-slate-500 uppercase tracking-wide">Status</span>
                 <span class="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide"
                    [ngClass]="getStatusClass(order.status)">
                    {{ order.status }}
                 </span>
             </div>

          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button (click)="close()" class="px-6 py-2 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-wide">
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `]
})
export class OrderDetailModalComponent implements OnInit {
  @Input() orderId: number | null = null;
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();

  orderService = inject(OrderService);
  order: Order | null = null;
  isLoading = false;

  ngOnInit() {
    // Watch for changes if needed, mainly relying on ngOnChanges for inputs in standard practice
    // but here implementing load method triggered by parent or input change manually if preferred.
  }

  // Called when modal opens specifically
  loadOrderDetails(id: number) {
    this.isLoading = true;
    this.order = null;
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        console.log('Order Details Response (Modal):', data);
        this.order = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading order details', err);
        this.isLoading = false;
      }
    });
  }

  close() {
    this.closeEvent.emit();
  }

  getStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'delivered':
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  }
}
