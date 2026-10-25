import toast from "react-hot-toast";

/**
 * Checks if the current browser is running on a mobile device based on User Agent.
 * @returns {boolean}
 */
export const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

/**
 * Copies text to clipboard and displays a success toast.
 * @param {string} text - The text to copy.
 * @param {string} [successMessage="Copied to clipboard!"] - The message to show in toast.
 */
export const copyToClipboard = async (text, successMessage = "Copied to clipboard!") => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(successMessage);
    } catch {
        toast.error("Failed to copy. Please copy manually.");
    }
};

/**
 * Handles phone clicks. If on desktop, copies phone number to clipboard. If on mobile, triggers tel dialer.
 * @param {React.MouseEvent} e
 * @param {string} phone
 */
export const handlePhoneClick = (e, phone) => {
    if (!isMobileDevice()) {
        e.preventDefault();
        copyToClipboard(phone, "Phone number copied to clipboard!");
    }
};
