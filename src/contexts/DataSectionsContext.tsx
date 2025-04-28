"use client"
import { DataSections } from '@/utils/dataSections';
import React, { createContext, useContext, useState, ReactNode } from 'react';


type DataSectionsContextType = {
  dataSections: DataSections;
  setDataSections: React.Dispatch<React.SetStateAction<DataSections>>;
};

const defaultDataSections: DataSections = {
  profile: { type: 'profile', image: null },
  biography: { type: 'biography', texts: [] },
  social_media: { type: 'social_media', texts: [] },
  gallery: { type: 'gallery', imagesGallery: null },
};

const DataSectionsContext = createContext<DataSectionsContextType | undefined>(undefined);

export const DataSectionsProvider = ({ children }: { children: ReactNode }) => {
  const [dataSections, setDataSections] = useState<DataSections>(defaultDataSections);

  return (
    <DataSectionsContext.Provider value={{ dataSections, setDataSections }}>
      {children}
    </DataSectionsContext.Provider>
  );
};

export const useDataSections = () => {
  const context = useContext(DataSectionsContext);
  if (!context) {
    throw new Error('useDataSections must be used within a DataSectionsProvider');
  }
  return context;
};
