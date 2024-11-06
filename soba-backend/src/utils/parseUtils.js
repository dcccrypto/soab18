/**
 * Parses token amount considering decimals
 * @param {number} amount - Raw token amount
 * @param {number} decimals - Token decimals (default: 9 for Solana)
 * @returns {number} Parsed amount
 */
const parseTokenAmount = (amount, decimals = 9) => {
  if (!amount) return 0;
  return amount / Math.pow(10, decimals);
};

/**
 * Formats Unix timestamp to ISO string
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} ISO date string
 */
const formatTimestamp = (timestamp) => {
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toISOString();
};

/**
 * Splits array into chunks for batch processing
 * @param {Array} array - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Array of chunks
 */
const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Validates Solana address
 * @param {string} address - Solana address to validate
 * @returns {boolean} Is valid address
 */
const isValidSolanaAddress = (address) => {
  if (!address) return false;
  return /^[A-HJ-NP-Za-km-z1-9]{32,44}$/.test(address);
};

/**
 * Formats number with commas
 * @param {number} number - Number to format
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {string} Formatted number
 */
const formatNumber = (number, decimals = 2) => {
  if (number === null || number === undefined) return '0';
  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

/**
 * Calculates percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
const calculatePercentageChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

module.exports = {
  parseTokenAmount,
  formatTimestamp,
  chunk,
  isValidSolanaAddress,
  formatNumber,
  calculatePercentageChange
}; 