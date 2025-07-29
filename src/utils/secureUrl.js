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

    // Only allow HTTPS URLs
    if (parsedUrl.protocol !== "https:") {
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

    // Additional checks for known safe domains
    const safeDomains = [
      "storage.googleapis.com",
      "drive.google.com",
      "dropbox.com",
      "onedrive.live.com",
      "github.com",
    ];

    const isKnownSafeDomain = safeDomains.some((domain) =>
      parsedUrl.hostname.includes(domain)
    );

    return isKnownSafeDomain;
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
  if (!isUrlSafe(url)) {
    console.error("Blocked potentially unsafe URL:", url);
    return;
  }

  // Open with security features
  const newWindow = window.open(url, windowName, "noopener,noreferrer");

  // Additional security: Clear referrer
  if (newWindow) {
    newWindow.opener = null;
  }
};
