// lib/services/settings.ts
import prisma from "@/lib/prisma";
import { Settings } from "@prisma/client";

export const getSettings = async (): Promise<Settings | null> => {
  try {
    const settings = await prisma.settings.findFirst();
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
};
