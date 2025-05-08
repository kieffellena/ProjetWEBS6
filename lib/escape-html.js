/** Very simple (though inefficient) function to escape HTML entities.
 * Replaces &, ", <, >, and ' with their HTML entity equivalents to prevent XSS
 * attacks.
 * @param {string} s The string to escape
 * @returns {string} The escaped string
 */
export function escapeHTML(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&apos;");
  }
  