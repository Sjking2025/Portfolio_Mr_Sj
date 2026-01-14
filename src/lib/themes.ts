// Theme definitions for the portfolio
// All colors are in HSL format for CSS variables

export interface Theme {
    id: string;
    name: string;
    colors: {
        background: string;
        foreground: string;
        card: string;
        cardForeground: string;
        popover: string;
        popoverForeground: string;
        primary: string;
        primaryForeground: string;
        secondary: string;
        secondaryForeground: string;
        muted: string;
        mutedForeground: string;
        accent: string;
        accentForeground: string;
        destructive: string;
        destructiveForeground: string;
        border: string;
        input: string;
        ring: string;
    };
    gradientText: string;
    backgroundGradient: string;
    scrollbarTrack: string;
    scrollbarThumb: string;
    scrollbarThumbHover: string;
    preview: {
        primary: string;
        accent: string;
    };
}

export const themes: Theme[] = [
    // Default - Cyber Purple
    {
        id: 'cyber-purple',
        name: 'Cyber Purple',
        colors: {
            background: '210 50% 3%',
            foreground: '210 40% 98%',
            card: '210 50% 6%',
            cardForeground: '210 40% 98%',
            popover: '210 50% 6%',
            popoverForeground: '210 40% 98%',
            primary: '263 85% 70%',
            primaryForeground: '210 50% 3%',
            secondary: '210 50% 12%',
            secondaryForeground: '210 40% 98%',
            muted: '210 50% 12%',
            mutedForeground: '215 20% 65%',
            accent: '210 50% 12%',
            accentForeground: '210 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '210 40% 98%',
            border: '210 50% 12%',
            input: '210 50% 12%',
            ring: '263 85% 70%',
        },
        gradientText: 'linear-gradient(45deg, #00d9ff, #8b5cf6, #ff0080)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #0f0f23, #1a1a2e, #16213e)',
        scrollbarTrack: 'rgba(139, 92, 246, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #00d9ff, #8b5cf6)',
        scrollbarThumbHover: 'linear-gradient(45deg, #8b5cf6, #ff0080)',
        preview: { primary: '#8b5cf6', accent: '#00d9ff' }
    },

    // Ocean Breeze - Teal
    {
        id: 'ocean-breeze',
        name: 'Ocean Breeze',
        colors: {
            background: '200 50% 4%',
            foreground: '180 40% 98%',
            card: '200 50% 7%',
            cardForeground: '180 40% 98%',
            popover: '200 50% 7%',
            popoverForeground: '180 40% 98%',
            primary: '172 66% 50%',
            primaryForeground: '200 50% 4%',
            secondary: '200 50% 12%',
            secondaryForeground: '180 40% 98%',
            muted: '200 50% 12%',
            mutedForeground: '180 20% 65%',
            accent: '200 50% 12%',
            accentForeground: '180 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '180 40% 98%',
            border: '200 50% 12%',
            input: '200 50% 12%',
            ring: '172 66% 50%',
        },
        gradientText: 'linear-gradient(45deg, #06b6d4, #14b8a6, #22d3ee)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(20, 184, 166, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #0a1929, #0d2137, #0f2942)',
        scrollbarTrack: 'rgba(20, 184, 166, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #06b6d4, #14b8a6)',
        scrollbarThumbHover: 'linear-gradient(45deg, #14b8a6, #22d3ee)',
        preview: { primary: '#14b8a6', accent: '#06b6d4' }
    },

    // Sunset Ember - Orange
    {
        id: 'sunset-ember',
        name: 'Sunset Ember',
        colors: {
            background: '20 30% 4%',
            foreground: '30 40% 98%',
            card: '20 30% 7%',
            cardForeground: '30 40% 98%',
            popover: '20 30% 7%',
            popoverForeground: '30 40% 98%',
            primary: '25 95% 53%',
            primaryForeground: '20 30% 4%',
            secondary: '20 30% 12%',
            secondaryForeground: '30 40% 98%',
            muted: '20 30% 12%',
            mutedForeground: '30 20% 65%',
            accent: '20 30% 12%',
            accentForeground: '30 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '30 40% 98%',
            border: '20 30% 12%',
            input: '20 30% 12%',
            ring: '25 95% 53%',
        },
        gradientText: 'linear-gradient(45deg, #fbbf24, #f97316, #ef4444)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(249, 115, 22, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #1a1410, #261c15, #2d211a)',
        scrollbarTrack: 'rgba(249, 115, 22, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #fbbf24, #f97316)',
        scrollbarThumbHover: 'linear-gradient(45deg, #f97316, #ef4444)',
        preview: { primary: '#f97316', accent: '#fbbf24' }
    },

    // Forest Midnight - Green
    {
        id: 'forest-midnight',
        name: 'Forest Midnight',
        colors: {
            background: '150 40% 4%',
            foreground: '140 40% 98%',
            card: '150 40% 7%',
            cardForeground: '140 40% 98%',
            popover: '150 40% 7%',
            popoverForeground: '140 40% 98%',
            primary: '160 84% 39%',
            primaryForeground: '150 40% 4%',
            secondary: '150 40% 12%',
            secondaryForeground: '140 40% 98%',
            muted: '150 40% 12%',
            mutedForeground: '140 20% 65%',
            accent: '150 40% 12%',
            accentForeground: '140 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '140 40% 98%',
            border: '150 40% 12%',
            input: '150 40% 12%',
            ring: '160 84% 39%',
        },
        gradientText: 'linear-gradient(45deg, #4ade80, #10b981, #059669)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #0a1a14, #0d2419, #10291e)',
        scrollbarTrack: 'rgba(16, 185, 129, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #4ade80, #10b981)',
        scrollbarThumbHover: 'linear-gradient(45deg, #10b981, #059669)',
        preview: { primary: '#10b981', accent: '#4ade80' }
    },

    // Rose Gold - Pink
    {
        id: 'rose-gold',
        name: 'Rose Gold',
        colors: {
            background: '330 30% 5%',
            foreground: '330 40% 98%',
            card: '330 30% 8%',
            cardForeground: '330 40% 98%',
            popover: '330 30% 8%',
            popoverForeground: '330 40% 98%',
            primary: '330 80% 60%',
            primaryForeground: '330 30% 5%',
            secondary: '330 30% 12%',
            secondaryForeground: '330 40% 98%',
            muted: '330 30% 12%',
            mutedForeground: '330 20% 65%',
            accent: '330 30% 12%',
            accentForeground: '330 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '330 40% 98%',
            border: '330 30% 12%',
            input: '330 30% 12%',
            ring: '330 80% 60%',
        },
        gradientText: 'linear-gradient(45deg, #f472b6, #ec4899, #db2777)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(236, 72, 153, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #1f1318, #2a1a22, #33202a)',
        scrollbarTrack: 'rgba(236, 72, 153, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #f9a8d4, #ec4899)',
        scrollbarThumbHover: 'linear-gradient(45deg, #ec4899, #db2777)',
        preview: { primary: '#ec4899', accent: '#f9a8d4' }
    },

    // Arctic Frost - Light Blue
    {
        id: 'arctic-frost',
        name: 'Arctic Frost',
        colors: {
            background: '215 50% 5%',
            foreground: '200 40% 98%',
            card: '215 50% 8%',
            cardForeground: '200 40% 98%',
            popover: '215 50% 8%',
            popoverForeground: '200 40% 98%',
            primary: '199 89% 48%',
            primaryForeground: '215 50% 5%',
            secondary: '215 50% 12%',
            secondaryForeground: '200 40% 98%',
            muted: '215 50% 12%',
            mutedForeground: '200 20% 65%',
            accent: '215 50% 12%',
            accentForeground: '200 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '200 40% 98%',
            border: '215 50% 12%',
            input: '215 50% 12%',
            ring: '199 89% 48%',
        },
        gradientText: 'linear-gradient(45deg, #7dd3fc, #38bdf8, #0ea5e9)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(56, 189, 248, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #0c1929, #111f33, #162640)',
        scrollbarTrack: 'rgba(56, 189, 248, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #7dd3fc, #38bdf8)',
        scrollbarThumbHover: 'linear-gradient(45deg, #38bdf8, #0ea5e9)',
        preview: { primary: '#38bdf8', accent: '#7dd3fc' }
    },

    // Royal Indigo - Indigo
    {
        id: 'royal-indigo',
        name: 'Royal Indigo',
        colors: {
            background: '240 50% 4%',
            foreground: '240 40% 98%',
            card: '240 50% 7%',
            cardForeground: '240 40% 98%',
            popover: '240 50% 7%',
            popoverForeground: '240 40% 98%',
            primary: '239 84% 67%',
            primaryForeground: '240 50% 4%',
            secondary: '240 50% 12%',
            secondaryForeground: '240 40% 98%',
            muted: '240 50% 12%',
            mutedForeground: '240 20% 65%',
            accent: '240 50% 12%',
            accentForeground: '240 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '240 40% 98%',
            border: '240 50% 12%',
            input: '240 50% 12%',
            ring: '239 84% 67%',
        },
        gradientText: 'linear-gradient(45deg, #a5b4fc, #6366f1, #4f46e5)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #0f0f2e, #151538, #1a1a42)',
        scrollbarTrack: 'rgba(99, 102, 241, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #a5b4fc, #6366f1)',
        scrollbarThumbHover: 'linear-gradient(45deg, #6366f1, #4f46e5)',
        preview: { primary: '#6366f1', accent: '#a5b4fc' }
    },

    // Crimson Night - Red
    {
        id: 'crimson-night',
        name: 'Crimson Night',
        colors: {
            background: '0 40% 4%',
            foreground: '0 40% 98%',
            card: '0 40% 7%',
            cardForeground: '0 40% 98%',
            popover: '0 40% 7%',
            popoverForeground: '0 40% 98%',
            primary: '0 84% 60%',
            primaryForeground: '0 40% 4%',
            secondary: '0 40% 12%',
            secondaryForeground: '0 40% 98%',
            muted: '0 40% 12%',
            mutedForeground: '0 20% 65%',
            accent: '0 40% 12%',
            accentForeground: '0 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '0 40% 98%',
            border: '0 40% 12%',
            input: '0 40% 12%',
            ring: '0 84% 60%',
        },
        gradientText: 'linear-gradient(45deg, #fca5a5, #ef4444, #dc2626)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(239, 68, 68, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #1a0f0f, #261515, #2d1a1a)',
        scrollbarTrack: 'rgba(239, 68, 68, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #fca5a5, #ef4444)',
        scrollbarThumbHover: 'linear-gradient(45deg, #ef4444, #dc2626)',
        preview: { primary: '#ef4444', accent: '#fca5a5' }
    },

    // Golden Hour - Amber
    {
        id: 'golden-hour',
        name: 'Golden Hour',
        colors: {
            background: '35 40% 4%',
            foreground: '40 40% 98%',
            card: '35 40% 7%',
            cardForeground: '40 40% 98%',
            popover: '35 40% 7%',
            popoverForeground: '40 40% 98%',
            primary: '38 92% 50%',
            primaryForeground: '35 40% 4%',
            secondary: '35 40% 12%',
            secondaryForeground: '40 40% 98%',
            muted: '35 40% 12%',
            mutedForeground: '40 20% 65%',
            accent: '35 40% 12%',
            accentForeground: '40 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '40 40% 98%',
            border: '35 40% 12%',
            input: '35 40% 12%',
            ring: '38 92% 50%',
        },
        gradientText: 'linear-gradient(45deg, #fde047, #f59e0b, #d97706)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(245, 158, 11, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #1a1508, #26200d, #2d2611)',
        scrollbarTrack: 'rgba(245, 158, 11, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #fde047, #f59e0b)',
        scrollbarThumbHover: 'linear-gradient(45deg, #f59e0b, #d97706)',
        preview: { primary: '#f59e0b', accent: '#fde047' }
    },

    // Mint Fresh - Mint Green
    {
        id: 'mint-fresh',
        name: 'Mint Fresh',
        colors: {
            background: '170 40% 4%',
            foreground: '160 40% 98%',
            card: '170 40% 7%',
            cardForeground: '160 40% 98%',
            popover: '170 40% 7%',
            popoverForeground: '160 40% 98%',
            primary: '160 84% 45%',
            primaryForeground: '170 40% 4%',
            secondary: '170 40% 12%',
            secondaryForeground: '160 40% 98%',
            muted: '170 40% 12%',
            mutedForeground: '160 20% 65%',
            accent: '170 40% 12%',
            accentForeground: '160 40% 98%',
            destructive: '0 63% 31%',
            destructiveForeground: '160 40% 98%',
            border: '170 40% 12%',
            input: '170 40% 12%',
            ring: '160 84% 45%',
        },
        gradientText: 'linear-gradient(45deg, #6ee7b7, #34d399, #10b981)',
        backgroundGradient: 'radial-gradient(ellipse at top, rgba(52, 211, 153, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #0a1a18, #0d241f, #102924)',
        scrollbarTrack: 'rgba(52, 211, 153, 0.1)',
        scrollbarThumb: 'linear-gradient(45deg, #6ee7b7, #34d399)',
        scrollbarThumbHover: 'linear-gradient(45deg, #34d399, #10b981)',
        preview: { primary: '#34d399', accent: '#6ee7b7' }
    },
];

export const getThemeById = (id: string): Theme => {
    return themes.find(t => t.id === id) || themes[0];
};

export const DEFAULT_THEME_ID = 'cyber-purple';
