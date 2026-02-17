import { z } from "zod";

export const reviewSchema = z.object({
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters long")
    .max(200, "Comment must be at most 200 characters long"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
