const axios = require('axios');

const API_URL = 'https://api.publicapis.org/entries';

const dataService = async (limit, category) => {
  try {
    const apiResponse = await axios.get(API_URL);

    let data = apiResponse.data.entries;

    if (category) {
      data = data.filter(entry => entry.Category.toLowerCase() === category.toLowerCase());
    }

    if(limit) {
      data = data.slice(0, limit);
    }

    return [ 200, { success: true, data } ];
  } catch(error) {
    return [ 500, { success: false, message: "Some error occured" } ];
  }
};

module.exports = { dataService };
