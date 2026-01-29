import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentTheme, setTheme, themes } = useTheme();

    const handleThemeSelect = (themeId: string) => {
        setTheme(themeId);
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Theme Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-effect flex items-center justify-center shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: isOpen
                        ? `0 0 30px ${currentTheme.preview.primary}40`
                        : `0 0 20px ${currentTheme.preview.primary}20`
                }}
                aria-label="Toggle theme selector"
            >
                <Palette
                    className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-12"
                />
            </motion.button>

            {/* Theme Picker Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-24 right-6 z-50 w-80 p-6 glass-effect rounded-2xl shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold gradient-text">Select Theme</h3>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </motion.button>
                            </div>

                            {/* Theme Grid */}
                            <div className="grid grid-cols-5 gap-3">
                                {themes.map((theme) => (
                                    <motion.button
                                        key={theme.id}
                                        onClick={() => handleThemeSelect(theme.id)}
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative group"
                                        title={theme.name}
                                    >
                                        {/* Theme Color Circle */}
                                        <div
                                            className="w-12 h-12 rounded-full relative overflow-hidden shadow-lg transition-all duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${theme.preview.primary} 0%, ${theme.preview.accent} 100%)`,
                                                boxShadow: currentTheme.id === theme.id
                                                    ? `0 0 20px ${theme.preview.primary}80`
                                                    : `0 4px 12px ${theme.preview.primary}30`
                                            }}
                                        >
                                            {/* Selected Checkmark */}
                                            {currentTheme.id === theme.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                                                >
                                                    <Check className="w-5 h-5 text-white" />
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Theme Name Tooltip */}
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap bg-background/80 px-2 py-1 rounded">
                                                {theme.name}
                                            </span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Current Theme Info */}
                            <div className="mt-8 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full shadow-md"
                                        style={{
                                            background: `linear-gradient(135deg, ${currentTheme.preview.primary} 0%, ${currentTheme.preview.accent} 100%)`
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{currentTheme.name}</p>
                                        <p className="text-xs text-muted-foreground">Current theme</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThemeSelector;
