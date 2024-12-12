import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().min(2).email(),
    password: z.string().min(2)
})
export const registerSchema = z.object({
    username: z.string().min(2),
    email: z.string().min(2).email(),
    password: z.string().min(2),
    confirm_password: z.string().min(2)
})

export const resetPasswordSchema = z.object({
    email: z.string().min(2).email(),
    password: z.string().min(2),
    confirm_password: z.string().min(2)
})

export const createPortifolioSchema = z.object({
    image_profile: z.instanceof(File),
    name_profile: z.string().min(4),
    city_profile: z.string().min(2),
    title_bio: z.string().min(4),
    title_support_bio: z.string().min(4),
    title_button_bio: z.string().min(2),
    link_bio: z.string().min(2),
    link_facebook_social_media: z.string().min(2).optional(),
    link_instagram_social_media: z.string().min(2).optional(),
    link_twitter_social_media: z.string().min(2).optional(),
    link_tiktok_social_media: z.string().min(2).optional(),
    link_youtube_social_media: z.string().min(2).optional(),
    photos_gallery: z.array(z.instanceof(File)).min(1),
})