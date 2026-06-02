// lib/services/settings.ts
import prisma from "@/lib/prisma";
import { Profile } from "@/generated/prisma";

export const getSettings = async (): Promise<Profile | null> => {
  try {
    const settings = await prisma.profile.findFirst({ orderBy: { id: "asc" } });
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
};
