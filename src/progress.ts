import { z } from "zod/mini";

// Stored progress comes from localStorage, so it may be missing, from an older
// version or edited by hand. A field that does not match is dropped (its
// default applies) instead of discarding the whole progress or crashing.
// zod/mini keeps the validation out of the bundle size budget.
const count = z.catch(z.optional(z.int().check(z.nonnegative())), undefined);
const keys = z.catch(z.optional(z.array(z.string())), undefined);

export const ProgressSchema = z.object({
  won: count,
  lost: count,
  games: count,
  unlockedActions: keys,
  unlockedEvents: keys,
  unlockedStripes: keys,
});

export type Progress = z.infer<typeof ProgressSchema>;

export const parseProgress = (stored: string | null): Progress => {
  if (!stored) {
    return {};
  }

  let json: unknown;

  try {
    json = JSON.parse(stored);
  } catch {
    return {};
  }

  const result = ProgressSchema.safeParse(json);

  return result.success ? result.data : {};
};
