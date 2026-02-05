import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DemoContextType {
    isDemoActive: boolean;
    setDemoActive: (active: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDemoActive, setDemoActive] = useState(false);

    return (
        <DemoContext.Provider value={{ isDemoActive, setDemoActive }}>
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = (): DemoContextType => {
    const context = useContext(DemoContext);
    if (!context) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
};
