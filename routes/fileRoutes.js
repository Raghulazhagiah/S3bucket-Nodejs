const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { listItems } = require('../utils/utils');

const baseDir = './S3Bucket';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.body.username;
        const bucketName = req.body.bucket;
        const userSpacePath = path.join(baseDir, username);
        const bucketPath = path.join(userSpacePath, bucketName);

        if (!fs.existsSync(userSpacePath)) {
            fs.mkdirSync(userSpacePath);
            console.log(`User space '${username}' created.`);
        }

        if (!fs.existsSync(bucketPath)) {
            fs.mkdirSync(bucketPath);
            console.log(`Bucket '${bucketName}' created in user space '${username}'.`);
        }

        cb(null, bucketPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4(); 
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Append UUID to the filename
    }
});

const upload = multer({ storage: storage });



// Upload a file to a specific bucket in a user space

router.post("/upload", upload.single("file"), (req, res) => {
    const username = req.body.username;
    const bucketName = req.body.bucket;
    res.send(`File uploaded to bucket '${bucketName}' in user space '${username}'.`);
});


// Delete a file from a specific bucket in a user space

router.delete("/delete/:username/:bucket/:filename", (req, res) => {
    const username = req.params.username;
    const bucketName = req.params.bucket;
    const filename = req.params.filename;
    const filePath = path.join(baseDir, username, bucketName, filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File not found:", err);
            return res.status(404).send("File not found");
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return res.status(500).send("Error deleting file");
            }
            console.log(`File '${filename}' deleted from bucket '${bucketName}' in user space '${username}'.`);
            res.send(`File '${filename}' deleted from bucket '${bucketName}' in user space '${username}'.`);
        });
    });
});

// Fetch a file from a specific bucket in a user space

router.get("/download/:username/:bucket/:filename", (req, res) => {
    const username = req.params.username;
    const bucketName = req.params.bucket;
    const filename = req.params.filename;
    const filePath = path.join(baseDir, username, bucketName, filename);

    console.log(`URL of the file represented as path: ${filePath}`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File not found:", err);
            return res.status(404).send("File not found");
        }
        const fileStream = fs.createReadStream(filePath);
        console.log(`Downloading file '${filename}' from bucket '${bucketName}' in user space '${username}'.`);
        fileStream.pipe(res);
    });
});


// List all items in a bucket of a user space

router.get("/list-items/:username/:bucket", (req, res) => {
    const username = req.params.username;
    const bucketName = req.params.bucket;
    listItems(username, bucketName, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading bucket contents.");
        }
        res.json({ files });
    });
});

module.exports = router;
