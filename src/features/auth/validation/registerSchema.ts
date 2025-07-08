import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Une majuscule est requise')
    .regex(/[0-9]/, 'Un chiffre est requis')
    .regex(/[^A-Za-z0-9]/, 'Un caractère spécial'),
});
