import { Injectable, signal, computed } from '@angular/core';
import { Product, Category } from '../models/product.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private allProducts: Product[] = [
        {
            id: 1,
            name: 'Asterisk Logo Tee',
            price: 35.0,
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuA8IHur7UfxyR0q_3-P4LRPqHvoIytqb_NEzMFxmrzh9RV6XK6jn-OtcHt5IEnLPPiA2X3zL60aYFGy52nB9DeahxVuMpKkSEwQbUUbuZmdDl4Rk_ekfKl7rDo8n7rJZburH6x6DACpRdm1pnvtwsWugHe1yLCyhTHas0x52G7ZzHkhfStk_hDPOKrZME1ftypxBF5nlaxLLixc2vYwrLNK9BH8Yc--ltr04ZMtNJOCil57KHz2i5oQaz-02SBx2uwycBqHV2xjrENs',
            category: 'Apparel',
            description:
                'Classic red asterisk logo on premium heavyweight black cotton tee. Pre-shrunk fit.',
            badge: 'BESTSELLER',
        },
        {
            id: 2,
            name: 'Californication Hoodie',
            price: 65.0,
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC5S6bFaechRBTaogPwYwTUojYlAX6dHRy81378qw_oUUjUfuM8u8Qb8IFs2K8KVAXFaTk5OcRquKTDO4YUZ0LG2337ppxiMCAlKYw1FqDRiqgdzg3hTxCuflIj7Lt367osZhSZ1sI6pKJAb0jXYr0ACCVXqi_VQk-ROI7oPo_fY3rqUgmH3JGTJU8-NcxaFMKllM402JaBwAvpmCE5HlTYVtfs740S_wA_buyqw2HY-QzkuThNBYZsW-a0OzfKCVAvz7BxNPVZjg8f',
            category: 'Apparel',
            description: 'Fleece-lined hoodie featuring the iconic sunset album artwork on the back.',
            badge: 'APPAREL',
        },
        {
            id: 3,
            name: 'BSSM 2LP Vinyl',
            price: 45.0,
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC7In1pjzikC4ylmoQogNPKXj9xkqWJk2VjLUPKEj5Arnqxk5lU2gl-AVJmUphJoZlZ0gfn2KlhfRZqgjWOErSd3EGBRISO-Sdotusj315jlNQGKjXJflm0BQgAlOATKSDzkMZE6rATxAGyCds5ObtP7RXJmXIBmrASxsqV5AYne0-HCLsi5GqOu-VftKtBQpEj9tej8Ks9H91OO3Vvc27TrkmeotwIYn3xjDCJ7sWQ3YiXh-HgbkPUWZwu6v6o5hGoOijET6zK7j7u',
            category: 'Music',
            description: 'The 1991 masterpiece. 180g double vinyl edition with high-fidelity remastering.',
            badge: 'VINYL',
        },
        {
            id: 4,
            name: 'Unlimited Love Cap',
            price: 28.0,
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAZCBiJpYzUfHTqRzD8MD31j7KR9UOWpJjeynaC9_xn5_ntcGFS8qpOa2eFwnwjYMMZLov_txmatYDak1RPJ6hMOogaHJCpvS0cl9GcA-pyRqgczLa20IElJ1l08Sec4ZBFrPtnFY-W2Z5kXuymvUfQvehi_NfBPcda-LSxKGL_lhtRCm4Ogi5X-AKm3Xmts0a4Iqqp8fEDRYcUJrI-BCC9an9oU4Wl7UsA2nMgEJuW1LHMpzdhFyKS2yo6ZJ5mdVmiUKRf6M2f3VOf',
            category: 'Accessories',
            description: 'Adjustable dad hat with embroidered neon logo from the Unlimited Love era.',
            badge: 'ACCESSORY',
        },
    ];

    constructor(private http: HttpClient) { }

    private selectedCategory = signal<Category>('All');
    private searchQuery = signal<string>('');
    private apiUrl = "http://localhost:5003";
    products = computed(() => {
        let filtered = this.allProducts;

        // Filter by category
        if (this.selectedCategory() !== 'All') {
            filtered = filtered.filter((p) => p.category === this.selectedCategory());
        }

        // Filter by search query
        const query = this.searchQuery().toLowerCase();
        if (query) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    });

    setCategory(category: Category) {
        this.selectedCategory.set(category);
    }

    setSearchQuery(query: string) {
        this.searchQuery.set(query);
    }

    getCategory() {
        return this.selectedCategory();
    }


    getAllProductsAdmin() {
        return this.http.get(this.apiUrl);
    }
}
