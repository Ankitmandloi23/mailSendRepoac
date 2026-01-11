const fs = require('fs');
const crypto = require('crypto');

module.exports = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
};
