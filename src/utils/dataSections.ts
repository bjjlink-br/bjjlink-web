export type TextsSection = {
    text: string;
    order: number;
};

export type SectionsTypes = "PROFILE" | "BIOGRAPHY" | "SOCIAL_MEDIA" | "GALLERY";

export type Section = {
    type: SectionsTypes
    texts?: TextsSection[];
    image?: File | null;
    imagesGallery?: File[] | null;
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
  