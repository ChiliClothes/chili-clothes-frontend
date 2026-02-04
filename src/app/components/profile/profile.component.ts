import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
    user = {
        name: 'Anthony Kiedis Fan',
        email: 'chili.pepper@gmail.com',
        points: 1250,
        totalOrders: 24,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXVII65yAiL6a81_QXDzSdqFTLWJrekVDf2gowJvrSsvBtCUfU68l-U_yzNbT_-60ztSvOlHuhmlecaMDNEtybkuEB6jkfOlshd7YSyNNCwBzSmJM3SMxrvZ9pI2PafkLfe4s-_A0-91SC5q6N1W5SSv8m6HlRcMFE_wJrANI6cxgEjYjCSOwKOkhEv7_jTXlHdT6A_TpZbdV40W5GDHis3ezqb6O6l0hMa6bVjdFwpn7XmzfnXs_bvjnzu86Ud5x9VGHnRMTwlqkw'
    };

    orders = [
        {
            id: 'RHCP-9904',
            date: 'Oct 24, 2023',
            items: '3 Items (Vinyl, Hoodie, Poster)',
            amount: '$145.50',
            status: 'Delivered',
            statusClass: 'bg-green-50 text-green-700 border border-green-200',
            icon: 'local_shipping'
        },
        {
            id: 'RHCP-9882',
            date: 'Oct 21, 2023',
            items: '1 Item (Limited Edition Sticker Set)',
            amount: '$12.00',
            status: 'In Transit',
            statusClass: 'bg-blue-50 text-blue-700 border border-blue-200',
            icon: 'inventory_2'
        },
        {
            id: 'RHCP-9712',
            date: 'Sep 15, 2023',
            items: '4 Items',
            amount: '$210.00',
            status: 'Cancelled',
            statusClass: 'bg-slate-50 text-slate-500 border border-slate-200',
            icon: 'cancel',
            opacity: 'opacity-50'
        }
    ];
}
