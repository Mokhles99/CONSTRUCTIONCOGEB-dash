const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
   
    const fileUrl = `https://res.cloudinary.com/dlp3bn4yr/image/upload/v1709559910/tests/${fileName}`;
 
    

    try {
        const response = await axios.get(fileUrl, { responseType: 'stream' });
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error downloading the file');
    }
});
router.get('/test/testing', (req, res) => {
    res.send('The download route is working');
});

module.exports = router;