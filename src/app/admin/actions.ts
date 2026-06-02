"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import {
  formatSearchParams,
  getNumber,
  getOptionalString,
  getOptionalUrl,
  getString,
  parseList,
  parseMedia,
  parseUrlList,
  requireFields,
  slugify,
} from "@/lib/admin-utils";

function adminRedirect(path: string, status: "success" | "error", message: string) {
  redirect(`${path}${formatSearchParams(status, message)}`);
}

async function guardedAction(path: string, action: () => Promise<void>) {
  await requireAdmin();

  try {
    await action();
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/projects");
    revalidatePath("/blogs");
    revalidatePath(path);
  } catch (error) {
    adminRedirect(
      path,
      "error",
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
}

export async function loginAction(formData: FormData) {
  const username = getString(formData, "username");
  const password = getString(formData, "password");
  const next = getString(formData, "next") || "/admin";

  if (!username || !password) {
    redirect("/admin/login?error=Username%20and%20password%20are%20required.");
  }

  const isValid = await loginAdmin(username, password);
  if (!isValid) {
    redirect("/admin/login?error=Invalid%20username%20or%20password.");
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login?success=Logged%20out.");
}

export async function saveProfile(formData: FormData) {
  await guardedAction("/admin/profile", async () => {
    requireFields(formData, [
      { key: "firstName", label: "First name" },
      { key: "lastName", label: "Last name" },
      { key: "email", label: "Email" },
      { key: "username", label: "Username" },
      { key: "jobTitle", label: "Job title" },
      { key: "aboutMessage", label: "About message" },
    ]);

    const id = Number(formData.get("id"));
    const password = getString(formData, "password");
    const dateOfBirth = getOptionalString(formData, "dateOfBirth");
    const data = {
      firstName: getString(formData, "firstName"),
      lastName: getString(formData, "lastName"),
      email: getString(formData, "email"),
      phoneNumber: getOptionalString(formData, "phoneNumber"),
      username: getString(formData, "username"),
      jobTitle: getString(formData, "jobTitle"),
      dateOfBirth: dateOfBirth ? new Date(`${dateOfBirth}T00:00:00`) : null,
      gender: getOptionalString(formData, "gender"),
      country: getOptionalString(formData, "country"),
      state: getOptionalString(formData, "state"),
      profileImageLarge: getOptionalUrl(formData, "profileImageLarge"),
      profileImageSmall: getOptionalUrl(formData, "profileImageSmall"),
      aboutMessage: getString(formData, "aboutMessage"),
      skills: parseList(formData.get("skills")),
      featuredSkills: parseList(formData.get("featuredSkills")),
      languages: parseList(formData.get("languages")),
      openToJobs: formData.get("openToJobs") === "on",
      facebookUrl: getOptionalUrl(formData, "facebookUrl", false),
      xUrl: getOptionalUrl(formData, "xUrl", false),
      linkedinUrl: getOptionalUrl(formData, "linkedinUrl", false),
      instagramUrl: getOptionalUrl(formData, "instagramUrl", false),
      tiktokUrl: getOptionalUrl(formData, "tiktokUrl", false),
      githubUrl: getOptionalUrl(formData, "githubUrl", false),
      websiteUrl: getOptionalUrl(formData, "websiteUrl", false),
      ...(password ? { passwordHash: hashPassword(password) } : {}),
    };

    if (Number.isFinite(id) && id > 0) {
      await prisma.profile.update({ where: { id }, data });
    } else {
      if (!password) throw new Error("Password required for a new profile.");
      await prisma.profile.create({
        data: { ...data, passwordHash: hashPassword(password) },
      });
    }
  });

  adminRedirect("/admin/profile", "success", "Profile saved.");
}

export async function saveWorkExperience(formData: FormData) {
  await guardedAction("/admin/work-experience", async () => {
    requireFields(formData, [
      { key: "companyName", label: "Company name" },
      { key: "jobTitle", label: "Job title" },
      { key: "startDate", label: "Start date" },
      { key: "description", label: "Description" },
    ]);

    const id = Number(formData.get("id"));
    const data = {
      companyName: getString(formData, "companyName"),
      jobTitle: getString(formData, "jobTitle"),
      technicalSkills: parseList(formData.get("technicalSkills")),
      startDate: getString(formData, "startDate"),
      endDate: getOptionalString(formData, "endDate"),
      isCurrentRole: formData.get("isCurrentRole") === "on",
      description: getString(formData, "description"),
      sortOrder: getNumber(formData, "sortOrder"),
    };

    if (Number.isFinite(id) && id > 0) {
      await prisma.workExperience.update({ where: { id }, data });
    } else {
      await prisma.workExperience.create({ data });
    }
  });

  adminRedirect("/admin/work-experience", "success", "Work experience saved.");
}

export async function deleteWorkExperience(formData: FormData) {
  await guardedAction("/admin/work-experience", async () => {
    await prisma.workExperience.delete({ where: { id: Number(formData.get("id")) } });
  });

  adminRedirect("/admin/work-experience", "success", "Work experience deleted.");
}

export async function saveEducationHistory(formData: FormData) {
  await guardedAction("/admin/education", async () => {
    requireFields(formData, [
      { key: "school", label: "School" },
      { key: "courseStudied", label: "Course studied" },
      { key: "startYear", label: "Start year" },
    ]);

    const id = Number(formData.get("id"));
    const data = {
      school: getString(formData, "school"),
      courseStudied: getString(formData, "courseStudied"),
      startYear: getString(formData, "startYear"),
      endYear: getOptionalString(formData, "endYear"),
      description: getOptionalString(formData, "description"),
      sortOrder: getNumber(formData, "sortOrder"),
    };

    if (Number.isFinite(id) && id > 0) {
      await prisma.educationHistory.update({ where: { id }, data });
    } else {
      await prisma.educationHistory.create({ data });
    }
  });

  adminRedirect("/admin/education", "success", "Education history saved.");
}

export async function deleteEducationHistory(formData: FormData) {
  await guardedAction("/admin/education", async () => {
    await prisma.educationHistory.delete({ where: { id: Number(formData.get("id")) } });
  });

  adminRedirect("/admin/education", "success", "Education history deleted.");
}

export async function savePortfolioProject(formData: FormData) {
  await guardedAction("/admin/projects", async () => {
    requireFields(formData, [
      { key: "title", label: "Title" },
      { key: "summary", label: "Summary" },
    ]);

    const title = getString(formData, "title");
    const id = Number(formData.get("id"));
    const data = {
      title,
      slug: getString(formData, "slug") || slugify(title),
      summary: getString(formData, "summary"),
      coverImage: getOptionalUrl(formData, "coverImage"),
      year: getOptionalString(formData, "year"),
      liveUrl: getOptionalUrl(formData, "liveUrl", false),
      repositoryUrl: getOptionalUrl(formData, "repositoryUrl", false),
      skillsUsed: parseList(formData.get("skillsUsed")),
      media: parseMedia(formData.get("media")),
      sortOrder: getNumber(formData, "sortOrder"),
      isFeatured: formData.get("isFeatured") === "on",
    };

    if (Number.isFinite(id) && id > 0) {
      await prisma.portfolioProject.update({ where: { id }, data });
    } else {
      await prisma.portfolioProject.create({ data });
    }
  });

  adminRedirect("/admin/projects", "success", "Project saved.");
}

export async function deletePortfolioProject(formData: FormData) {
  await guardedAction("/admin/projects", async () => {
    await prisma.portfolioProject.delete({ where: { id: Number(formData.get("id")) } });
  });

  adminRedirect("/admin/projects", "success", "Project deleted.");
}

export async function saveCertification(formData: FormData) {
  await guardedAction("/admin/certifications", async () => {
    requireFields(formData, [
      { key: "title", label: "Title" },
      { key: "issuer", label: "Issuer" },
    ]);

    const id = Number(formData.get("id"));
    const data = {
      title: getString(formData, "title"),
      acronym: getOptionalString(formData, "acronym"),
      issuer: getString(formData, "issuer"),
      dateObtained: getOptionalString(formData, "dateObtained"),
      credentialUrl: getOptionalUrl(formData, "credentialUrl", false),
      sortOrder: getNumber(formData, "sortOrder"),
    };

    if (Number.isFinite(id) && id > 0) {
      await prisma.certification.update({ where: { id }, data });
    } else {
      await prisma.certification.create({ data });
    }
  });

  adminRedirect("/admin/certifications", "success", "Certification saved.");
}

export async function deleteCertification(formData: FormData) {
  await guardedAction("/admin/certifications", async () => {
    await prisma.certification.delete({ where: { id: Number(formData.get("id")) } });
  });

  adminRedirect("/admin/certifications", "success", "Certification deleted.");
}

export async function saveBlog(formData: FormData) {
  await guardedAction("/admin/blogs", async () => {
    requireFields(formData, [
      { key: "title", label: "Title" },
      { key: "excerpt", label: "Excerpt" },
      { key: "details", label: "Details" },
    ]);

    const title = getString(formData, "title");
    const id = Number(formData.get("id"));
    const data = {
      title,
      slug: getString(formData, "slug") || slugify(title),
      excerpt: getString(formData, "excerpt"),
      details: getString(formData, "details"),
      readMinute: Number(formData.get("readMinute") || 1),
      featuredImage: getOptionalUrl(formData, "featuredImage"),
      galleryImages: parseUrlList(formData.get("galleryImages")),
      youtubeLink: getOptionalUrl(formData, "youtubeLink", false),
      published: formData.get("published") === "on",
    };

    if (Number.isFinite(id) && id > 0) {
      await prisma.blog.update({ where: { id }, data });
    } else {
      await prisma.blog.create({ data });
    }
  });

  adminRedirect("/admin/blogs", "success", "Blog post saved.");
}

export async function deleteBlog(formData: FormData) {
  await guardedAction("/admin/blogs", async () => {
    await prisma.blog.delete({ where: { id: Number(formData.get("id")) } });
  });

  adminRedirect("/admin/blogs", "success", "Blog post deleted.");
}
