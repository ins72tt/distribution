const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcom'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

// Form Page
router.get('/new', ensureAuthenticated, (req, res) => 
    res.render('test2'));

// Handle Form Submission
router.post('/submit-form', ensureAuthenticated, (req, res) => {
    const formData = req.body;

    // Format form data into CSV format
    const csvData = formatFormDataToCSV(formData);

    // Define the file path
    const filePath = path.join(__dirname, '..', 'uploads', 'music_submission.csv');

    // Write CSV data to a file on the server
    fs.writeFile(filePath, csvData, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error saving form data.' });
        } else {
            console.log('Form data saved successfully.');
            return res.status(200).json({ success: true, message: 'Form data saved successfully.' });
        }
    });
});

// Format form data into CSV
function formatFormDataToCSV(formData) {
    // Extract and format form data into CSV
    const headers = ["Artist Name", "Album/Single Name", "Genre", "Sub-Genre", "Label Name", "Publisher", "TikTok Clip Start Time", "Songwriter", "Original Release Date", "Language", "Explicit", "Cover Art Check", "Upload Music"];
    const values = [
        formData.artistName, formData.albumName, formData.genre, formData.subGenre, formData.labelName, formData.publisher, formData.tiktokClipStartTime, formData.songwriter, formData.originalReleaseDate, formData.language, formData.explicit, formData.coverArtCheck, formData.uploadMusic
    ];

    return `${headers.join(",")}\n${values.join(",")}\n`;
}

module.exports = router;
