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
    @Input() productToEdit: ProductAdmin | null = null;
    @Output() productCreated = new EventEmitter<ProductAdmin>();
    @Output() productUpdated = new EventEmitter<ProductAdmin>();
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
            imageUrl: ['', [Validators.pattern('https?://.+')]],
            isActive: [true]
        });
    }

    openModal() {
        this.isOpen = true;
        if (this.productToEdit) {
            this.productForm.patchValue({
                name: this.productToEdit.name,
                description: this.productToEdit.description,
                price: this.productToEdit.price,
                stock: this.productToEdit.stock,
                imageUrl: this.productToEdit.imageUrl || '',
                isActive: this.productToEdit.isActive
            });
        } else {
            this.productForm.reset({
                name: '',
                description: '',
                price: 0,
                stock: 0,
                imageUrl: '',
                isActive: true
            });
        }
    }

    closeModal() {
        this.isOpen = false;
        this.productForm.reset();
        this.modalClosed.emit();
    }

    onSubmit() {
        if (this.productForm.valid && !this.isSubmitting) {
            this.isSubmitting = true;

            if (this.productToEdit) {
                // Update existing product
                const updatedProduct = {
                    ...this.productToEdit,
                    ...this.productForm.value
                };

                this.productService.updateProduct(this.productToEdit.id, updatedProduct).subscribe({
                    next: (product: ProductAdmin) => {
                        this.productUpdated.emit(product);
                        this.closeModal();
                        this.isSubmitting = false;
                        this.toastService.success('Product updated successfully!');
                    },
                    error: (error: any) => this.handleError(error)
                });
            } else {
                // Create new product
                const newProduct = {
                    ...this.productForm.value,
                    id: 0,
                    createdAt: new Date()
                };

                this.productService.createProduct(newProduct).subscribe({
                    next: (createdProduct: ProductAdmin) => {
                        this.productCreated.emit(createdProduct);
                        this.closeModal();
                        this.isSubmitting = false;
                    },
                    error: (error: any) => this.handleError(error)
                });
            }
        } else if (!this.productForm.valid) {
            this.toastService.warning('Please fill in all required fields correctly.');
        }
    }

    private handleError(error: any) {
        console.error('Error saving product:', error);
        const errorMessage = error?.error?.message ||
            error?.message ||
            'Error saving product. Please try again.';
        this.toastService.error(errorMessage);
        this.isSubmitting = false;
    }
}
