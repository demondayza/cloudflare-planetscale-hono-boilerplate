import { z } from 'zod';
import { password } from './custom.validation';

export const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().superRefine(password),
    first_name: z.string(),
    last_name: z.string(),
    role: z.union([z.literal('admin'), z.literal('user')]),
    is_email_verified: z.boolean().optional().transform(() => false)
  })
});

export type CreateUser = z.infer<typeof createUser>['body'];

export const getUsers = z.object({
  query: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z
      .string()
      .transform((v) => parseInt(v, 10))
      .optional(),
    page: z
      .string()
      .transform((v) => parseInt(v, 10))
      .optional()
  })
});

export const getUser = z.object({
  params: z.object({
    userId: z.number()
  })
});

export const updateUser = z.object({
  params: z.object({
    userId: z.number(),
  }),
  body: z.object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.union([z.literal('admin'), z.literal('user')]),
  })
});

export type UpdateUser = z.infer<typeof updateUser>['body'];

export const deleteUser = z.object({
  params: z.object({
    userId: z.number()
  })
});
