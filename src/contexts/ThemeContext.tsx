import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, themes, getThemeById, DEFAULT_THEME_ID } from '@/lib/themes';

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (themeId: string) => void;
    themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        // Get saved theme from localStorage or use default
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return getThemeById(saved);
            }
        }
        return getThemeById(DEFAULT_THEME_ID);
    });

    // Apply theme to document
    const applyTheme = (theme: Theme) => {
        const root = document.documentElement;

        // Set CSS variables
        root.style.setProperty('--background', theme.colors.background);
        root.style.setProperty('--foreground', theme.colors.foreground);
        root.style.setProperty('--card', theme.colors.card);
        root.style.setProperty('--card-foreground', theme.colors.cardForeground);
        root.style.setProperty('--popover', theme.colors.popover);
        root.style.setProperty('--popover-foreground', theme.colors.popoverForeground);
        root.style.setProperty('--primary', theme.colors.primary);
        root.style.setProperty('--primary-foreground', theme.colors.primaryForeground);
        root.style.setProperty('--secondary', theme.colors.secondary);
        root.style.setProperty('--secondary-foreground', theme.colors.secondaryForeground);
        root.style.setProperty('--muted', theme.colors.muted);
        root.style.setProperty('--muted-foreground', theme.colors.mutedForeground);
        root.style.setProperty('--accent', theme.colors.accent);
        root.style.setProperty('--accent-foreground', theme.colors.accentForeground);
        root.style.setProperty('--destructive', theme.colors.destructive);
        root.style.setProperty('--destructive-foreground', theme.colors.destructiveForeground);
        root.style.setProperty('--border', theme.colors.border);
        root.style.setProperty('--input', theme.colors.input);
        root.style.setProperty('--ring', theme.colors.ring);

        // Set custom gradient variables
        root.style.setProperty('--gradient-text', theme.gradientText);
        root.style.setProperty('--scrollbar-track', theme.scrollbarTrack);
        root.style.setProperty('--scrollbar-thumb', theme.scrollbarThumb);
        root.style.setProperty('--scrollbar-thumb-hover', theme.scrollbarThumbHover);

        // Apply background gradient to body
        document.body.style.background = theme.backgroundGradient;

        // Add transition class for smooth theme switching
        root.classList.add('theme-transitioning');
        setTimeout(() => {
            root.classList.remove('theme-transitioning');
        }, 300);
    };

    // Apply theme on mount and when it changes
    useEffect(() => {
        applyTheme(currentTheme);
    }, [currentTheme]);

    // Keyboard shortcut: Press 'T' to cycle themes
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Don't trigger if typing in an input field
            const target = event.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return;
            }

            if (event.key === 't' || event.key === 'T') {
                const currentIndex = themes.findIndex(t => t.id === currentTheme.id);
                const nextIndex = (currentIndex + 1) % themes.length;
                const nextTheme = themes[nextIndex];
                setCurrentTheme(nextTheme);
                localStorage.setItem(STORAGE_KEY, nextTheme.id);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentTheme]);

    // Set theme function
    const setTheme = (themeId: string) => {
        const theme = getThemeById(themeId);
        setCurrentTheme(theme);
        localStorage.setItem(STORAGE_KEY, themeId);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
