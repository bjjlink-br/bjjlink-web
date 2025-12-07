"use client"
import { DataSections } from '@/utils/dataSections';
import React, { createContext, useContext, useState, ReactNode } from 'react';


type DataSectionsContextType = {
  dataSections: DataSections;
  setDataSections: React.Dispatch<React.SetStateAction<DataSections>>;
};

export const defaultDataSections: DataSections = {
  profile: { type: 'PROFILE', image: null },
  biography: { 
    type: 'BIOGRAPHY', 
    texts: [
      { text: 'Meu objetivo como atleta!', order: 1 },
      { text: 'Com disciplina e maestria, BJJ Master é um ícone do jiu-jitsu. Sua jornada é uma fusão de valores e superação, inspirando outros a alcançarem seus objetivos. Além do tatame, ele inspira como mestre, mostrando que a paixão e a determinação transcendem fronteiras.', order: 2 },
      { text: 'Vamos conversar', order: 3 },
      { text: '', order: 4 }
    ] 
  },
  social_media: { type: 'SOCIAL_MEDIA', texts: [] },
  gallery: { type: 'GALLERY', imagesGallery: null },
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
