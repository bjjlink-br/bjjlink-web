import { api } from "@/services/api";

import { AUTH_STORAGE_KEY, GET_COMPONENTS_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext";
import { DataSections } from "./dataSections";
import { KEYS_STORAGE } from "./constants";

export const signOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_DATA_STORAGE_KEY);
    localStorage.removeItem(KEYS_STORAGE.sections);
    localStorage.removeItem(KEYS_STORAGE.sectionsEdit);
    localStorage.removeItem(GET_COMPONENTS_KEY)
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

export const isPortfolioReadyToPublish = (storageKey?: string): boolean => {
  try {
    const key = storageKey || KEYS_STORAGE.sections;
    const storedSections = localStorage.getItem(key);
    
    if (!storedSections) {
      return false;
    }

    const sections: DataSections = JSON.parse(storedSections);

    // Validar PROFILE
    const hasProfileImage = sections.profile?.image !== null && sections.profile?.image !== undefined;
    const hasProfileText = sections.profile?.texts && sections.profile.texts.length > 0 && sections.profile.texts[0]?.text?.trim();

    // Validar BIOGRAPHY
    const hasBiographyTexts = sections.biography?.texts && sections.biography.texts.length >= 4;
    const hasBiographyTitle = sections.biography?.texts?.[0]?.text?.trim();
    const hasBiographyDescription = sections.biography?.texts?.[1]?.text?.trim();
    const hasBiographyButton = sections.biography?.texts?.[2]?.text?.trim();
    const hasBiographyLink = sections.biography?.texts?.[3]?.text?.trim();

    // Validar SOCIAL_MEDIA
    const hasSocialTexts = sections.social_media?.texts && sections.social_media.texts.length >= 3;
    const hasSocialLinks = sections.social_media?.texts?.every(text => text.text?.trim());

    // Validar GALLERY
    const hasGalleryImages = sections.gallery?.imagesGallery && sections.gallery.imagesGallery.length > 0;

    return (
      hasProfileImage &&
      hasProfileText &&
      hasBiographyTexts &&
      hasBiographyTitle &&
      hasBiographyDescription &&
      hasBiographyButton &&
      hasBiographyLink &&
      hasSocialTexts &&
      hasSocialLinks &&
      hasGalleryImages
    );
  } catch (error) {
    console.error('Erro ao validar portfólio:', error);
    return false;
  }
};