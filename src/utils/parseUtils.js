const parseTokenAmount = (amount, decimals = 9) => {
  return amount / Math.pow(10, decimals);
};

const formatTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toISOString();
};

const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

module.exports = {
  parseTokenAmount,
  formatTimestamp,
  chunk
}; 