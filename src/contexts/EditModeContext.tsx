"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { KEYS_STORAGE } from '@/utils/constants';

type EditModeContextType = {
  isEditMode: boolean;
  getStorageKey: () => string;
};

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

const defaultEditModeContext: EditModeContextType = {
  isEditMode: false,
  getStorageKey: () => KEYS_STORAGE.sections,
};

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
  return context ?? defaultEditModeContext;
};
