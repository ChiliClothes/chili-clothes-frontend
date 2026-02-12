import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProductAdminService } from '../../services/product-admin.service';
import { ProductAdmin } from '../../models/product-admin.model';
import { ToastService } from '../../services/toast';

@Component({
    selector: 'app-create-product-modal',
    imports: [ReactiveFormsModule],
    templateUrl: './create-product-modal.html'
})
export class CreateProductModal {
    @Input() isOpen: boolean = false;
    @Output() productCreated = new EventEmitter<ProductAdmin>();
    @Output() modalClosed = new EventEmitter<void>();

    productForm: FormGroup;
    isSubmitting: boolean = false;

    constructor(
        private fb: FormBuilder,
        private productService: ProductAdminService,
        private toastService: ToastService
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            price: [0, [Validators.required, Validators.min(0.01)]],
            stock: [0, [Validators.required, Validators.min(0)]],
            isActive: [true]
        });
    }

    openModal() {
        this.isOpen = true;
        this.productForm.reset({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            isActive: true
        });
    }

    closeModal() {
        this.isOpen = false;
        this.productForm.reset();
        this.modalClosed.emit();
    }

    onSubmit() {
        if (this.productForm.valid && !this.isSubmitting) {
            this.isSubmitting = true;

            const newProduct = {
                ...this.productForm.value,
                id: 0, // Temporal, el backend asignará el ID real
                createdAt: new Date()
            };

            this.productService.createProduct(newProduct).subscribe({
                next: (createdProduct: ProductAdmin) => {
                    this.productCreated.emit(createdProduct);
                    this.closeModal();
                    this.isSubmitting = false;
                },
                error: (error: any) => {
                    console.error('Error creating product:', error);

                    const errorMessage = error?.error?.message ||
                        error?.message ||
                        'Error creating product. Please try again.';

                    this.toastService.error(errorMessage);
                    this.isSubmitting = false;
                }
            });
        } else if (!this.productForm.valid) {
            this.toastService.warning('Please fill in all required fields correctly.');
        }
    }
}
