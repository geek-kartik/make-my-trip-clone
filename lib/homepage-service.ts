import { homepageContent } from "@/data/homepage";
import type { HomepageContent } from "@/lib/types";

export async function getHomepageContent(): Promise<HomepageContent> {
  // Keep this boundary narrow so a FastAPI REST endpoint can replace the
  // in-memory content without changing page or component contracts.
  return homepageContent;
}
