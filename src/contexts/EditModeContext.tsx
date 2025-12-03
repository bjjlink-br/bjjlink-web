"use client"
import React, { createContext, useContext, ReactNode } from 'react';

type EditModeContextType = {
  isEditMode: boolean;
  getStorageKey: () => string;
};

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider = ({ 
  children, 
  isEditMode = false 
}: { 
  children: ReactNode;
  isEditMode?: boolean;
}) => {
  const getStorageKey = () => {
    return isEditMode ? '@BJJLink-Edit:portifolio_sections' : '@BJJLink:portifolio_sections';
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, getStorageKey }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
