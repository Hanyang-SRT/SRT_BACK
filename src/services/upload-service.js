const axios = require('axios');

exports.processAudio = async (file) => {
  try {
    const data = axios.post('http://<IP>:<PORT>', file.buffer, {
      headers: {
        'Content-Type': file.mimetype,
        'Content-Length': file.size,
      },
      timeout: 10000,
    });
  } catch (err) {}
};
