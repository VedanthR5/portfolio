// Google Analytics utility functions
// Note: gtag is loaded globally via index.html

// Track resume click attempts
export const trackResumeClick = (clickCount) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "resume_click_attempt", {
      event_category: "engagement",
      event_label: "resume_access_attempt",
      value: clickCount,
      custom_parameter_1: new Date().toISOString(),
    });
    console.log("GA Event: Resume click attempt tracked");
  }
};

// Track successful resume access
export const trackResumeSuccess = (successCount) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "resume_access_success", {
      event_category: "engagement",
      event_label: "resume_access_granted",
      value: successCount,
      custom_parameter_1: new Date().toISOString(),
    });
    console.log("GA Event: Resume access success tracked");
  }
};

// Track password failures
export const trackPasswordFailure = (attemptCount) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "password_failure", {
      event_category: "security",
      event_label: "resume_password_failed",
      value: attemptCount,
    });
    console.log("GA Event: Password failure tracked");
  }
};

// Track general project clicks
export const trackProjectClick = (projectName) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "project_click", {
      event_category: "engagement",
      event_label: projectName,
      value: 1,
    });
    console.log("GA Event: Project click tracked -", projectName);
  }
};
