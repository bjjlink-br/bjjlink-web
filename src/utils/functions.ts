import { api } from "@/services/api";

import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { DataSections } from "./dataSections";

export const signOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('@Bjjlink-user');
    api.defaults.headers.token = '';
}

export const validateDataSections = (sections: DataSections): {
    isValid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];
  
    // PROFILE
    if (!sections.profile?.image || sections.profile.texts?.length === 0) {
      errors.push("A seção 'profile' está sem imagem.");
    }
    if (!sections.profile?.texts || sections.profile.texts.length === 0) {
      errors.push("A seção 'profile' está sem textos.");
    }
  
    // BIOGRAPHY
    if (!sections.biography?.texts || sections.biography.texts.length < 2) {
      errors.push("A seção 'biography' deve ter pelo menos título e descrição.");
    }
  
    // SOCIAL_MEDIA
    if (!sections.social_media?.texts || sections.social_media.texts.length === 0) {
      errors.push("A seção 'social_media' deve ter pelo menos um link.");
    }
  
    // GALLERY
    if (!sections.gallery?.imagesGallery || sections.gallery.imagesGallery.length === 0) {
      errors.push("A seção 'gallery' está sem imagens.");
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
};