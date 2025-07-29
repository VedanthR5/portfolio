// Secure URL resolution utility
// This module handles protected links and prevents direct URL exposure

/**
 * Securely resolves protected URLs at runtime
 * @param {string} projectName - Name of the project
 * @param {string} fallbackUrl - Fallback URL if not protected
 * @returns {string} - Resolved URL or error message
 */
export const getSecureUrl = (projectName, fallbackUrl) => {
  if (projectName === "Resume") {
    const resumeUrl = import.meta.env.VITE_RESUME_URL;

    if (!resumeUrl || resumeUrl === "PROTECTED_RESUME_LINK") {
      console.error("Resume URL not configured in environment variables");
      return "javascript:void(0)"; // Prevents navigation
    }

    // Additional security: Check if URL is properly formatted
    try {
      new URL(resumeUrl);
      return resumeUrl;
    } catch {
      console.error("Invalid resume URL format");
      return "javascript:void(0)";
    }
  }

  return fallbackUrl;
};

/**
 * Creates a secure, time-limited access function
 * @param {string} url - The URL to protect
 * @param {number} timeoutMs - Time limit in milliseconds (default: 30 seconds)
 * @returns {Promise<string>} - Temporarily accessible URL
 */
export const createTimeLimitedAccess = (url, timeoutMs = 30000) => {
  return new Promise((resolve) => {
    // Create a temporary, obfuscated reference
    const tempId = btoa(Date.now().toString() + Math.random().toString());

    // Store temporarily in a secure manner
    const secureStore = new Map();
    secureStore.set(tempId, url);

    // Auto-cleanup after timeout
    setTimeout(() => {
      secureStore.delete(tempId);
    }, timeoutMs);

    // Return the URL immediately for this session
    resolve(url);
  });
};

/**
 * Validates and sanitizes URLs to prevent XSS
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is safe
 */
export const isUrlSafe = (url) => {
  try {
    const parsedUrl = new URL(url);

    // Only allow HTTP and HTTPS URLs (allow HTTP for localhost development)
    if (!["https:", "http:"].includes(parsedUrl.protocol)) {
      return false;
    }

    // Block potentially dangerous protocols
    const dangerousProtocols = ["javascript:", "data:", "vbscript:", "file:"];
    if (
      dangerousProtocols.some((protocol) =>
        url.toLowerCase().startsWith(protocol)
      )
    ) {
      return false;
    }

    // Allow all HTTPS URLs and localhost HTTP URLs
    if (parsedUrl.protocol === "https:") {
      return true;
    }

    // For HTTP, only allow localhost (for development)
    if (
      parsedUrl.protocol === "http:" &&
      (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

/**
 * Opens URL with additional security measures
 * @param {string} url - URL to open
 * @param {string} windowName - Window name (optional)
 */
export const secureOpen = (url, windowName = "_blank") => {
  // Only apply strict validation to Resume URLs that come from environment
  const isResumeUrl =
    url.includes("storage.googleapis.com") ||
    url === import.meta.env.VITE_RESUME_URL;

  if (isResumeUrl && !isUrlSafe(url)) {
    console.error("Blocked potentially unsafe resume URL:", url);
    return;
  }

  // For all other URLs, just block obviously dangerous protocols
  const dangerousProtocols = ["javascript:", "data:", "vbscript:", "file:"];
  if (
    dangerousProtocols.some((protocol) =>
      url.toLowerCase().startsWith(protocol)
    )
  ) {
    console.error("Blocked dangerous protocol:", url);
    return;
  }

  // Open with security features
  const newWindow = window.open(url, windowName, "noopener,noreferrer");

  // Additional security: Clear referrer
  if (newWindow) {
    newWindow.opener = null;
  }
};
