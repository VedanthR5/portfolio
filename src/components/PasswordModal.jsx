import { useState } from "react";
import PropTypes from "prop-types";
import { trackPasswordFailure } from "../utils/analytics";

const PasswordModal = ({ isOpen, onClose, onSuccess, itemName }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Security: Rate limiting - increase delay with more attempts
    const delay = Math.min(1000 + attemptCount * 500, 5000);
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Basic brute force protection
    if (attemptCount >= 5) {
      setError(
        "Too many failed attempts. Please refresh the page and try again."
      );
      setIsLoading(false);
      return;
    }

    // Hash the input password and compare (basic client-side protection)
    const inputHash = btoa(password); // Base64 encoding for basic obfuscation
    const storedHash = btoa(import.meta.env.VITE_RESUME_PASSWORD || "");

    if (inputHash === storedHash) {
      onSuccess();
      setPassword("");
      setAttemptCount(0);
      onClose();
    } else {
      // Track failed password attempts
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      const failedAttempts =
        parseInt(localStorage.getItem("passwordFailures") || "0", 10) + 1;
      localStorage.setItem("passwordFailures", failedAttempts.toString());
      trackPasswordFailure(failedAttempts);

      setError(
        `Incorrect password. Access denied. (${newAttemptCount}/5 attempts)`
      );
      setPassword("");
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-tertiary rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
        <div className="text-center mb-6">
          <h3 className="text-white text-xl font-bold mb-2">
            Protected Content
          </h3>
          <p className="text-secondary text-sm">
            Access to {itemName} requires authorization
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Enter Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-[#915EFF]"
              placeholder="Enter your password..."
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-600 py-3 px-6 rounded-xl outline-none text-white font-bold shadow-md hover:bg-gray-700 transition-colors duration-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#915EFF] py-3 px-6 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#7c3aed] transition-colors duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Access"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-secondary text-xs">
            This content is password protected for privacy
          </p>
        </div>
      </div>
    </div>
  );
};

PasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
};

export default PasswordModal;
