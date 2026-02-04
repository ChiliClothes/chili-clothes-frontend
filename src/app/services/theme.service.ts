import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    isDarkMode = signal<boolean>(false);

    constructor() {
        // Initialize theme from localStorage or system preference
        this.initializeTheme();

        // Apply theme changes to HTML element
        effect(() => {
            const html = document.documentElement;
            if (this.isDarkMode()) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
        });
    }

    private initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.isDarkMode.set(true);
        } else {
            // Default to light mode
            this.isDarkMode.set(false);
        }
    }

    toggleTheme() {
        this.isDarkMode.update((value) => !value);
    }
}
