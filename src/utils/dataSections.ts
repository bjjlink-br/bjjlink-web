export type TextsSection = {
    text: string;
    order: number;
};

export type SectionsTypes = "PROFILE" | "BIOGRAPHY" | "SOCIAL_MEDIA" | "GALLERY";

// Novo tipo unificado que permite File OU objeto remoto
export type GalleryImage = {
    id: string;
    name: string;
    preview: string;
    file?: File;
    isRemote: boolean;
};

export type Section = {
    type: SectionsTypes
    texts?: TextsSection[];
    image?: File | null | GalleryImage;
    imagesGallery?: File[] | null | any;
};

export type SectionBodyAPI = {
    type: SectionsTypes;
    texts?: TextsSection[];
    image?: File;
}

export type DataSections = {
    profile: Section;
    biography: Section;
    social_media: Section;
    gallery: Section;
};
  