import { getCurrentEnvironment } from "@/utils/environment";

export const IS_DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true"; // Enables logging, etc.

export const IS_PRODUCTION = getCurrentEnvironment() === "production"; // Enables analytics, etc.

export const PUBLIC_URL = process.env.NEXT_PUBLIC_PUBLIC_URL; // Variant 2: .env variable is optional

IS_DEBUG &&
  console.log("@/config", {
    IS_DEBUG,
    IS_PRODUCTION,
    PUBLIC_URL,
  });
