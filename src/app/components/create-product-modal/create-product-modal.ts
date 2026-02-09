import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-product-modal',
  imports: [],
  templateUrl: './create-product-modal.html',
})
export class CreateProductModal {
    @Input() isOpen: boolean = false;


    openModal() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
    }
}
