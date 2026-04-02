import React, { createContext, useContext, useEffect, useState } from 'react';
import DevToolsDetector from 'devtools-detector';

interface DevToolsContextType {
  isDevToolsOpen: boolean;
}

const DevToolsContext = createContext<DevToolsContextType | undefined>(undefined);

export const DevToolsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    DevToolsDetector.launch();

    const handleDevToolsChange = (isOpen: boolean) => {
      setIsDevToolsOpen(isOpen);
    };

    DevToolsDetector.addListener(handleDevToolsChange);

    return () => {
      DevToolsDetector.removeListener(handleDevToolsChange);
      DevToolsDetector.stop();
    };
  }, []);

  return (
    <DevToolsContext.Provider value={{ isDevToolsOpen }}>
      {children}
    </DevToolsContext.Provider>
  );
};

export const useDevTools = () => {
  const context = useContext(DevToolsContext);
  if (!context) {
    throw new Error('useDevTools must be used within DevToolsProvider');
  }
  return context;
};