const { promises } = require('fs');

const readJson = async (file) => {
  try {
    const data = await promises.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config data:', error);
    return {};
  }
}

module.exports = readJson;