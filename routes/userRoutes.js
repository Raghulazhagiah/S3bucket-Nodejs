const express = require('express');
const router = express.Router();
const { createUserSpace, createBucket, listBuckets } = require('../utils/utils');

// Create a new user space 

router.post("/createuser", (req, res) => {
    const username = req.body.username;
    createUserSpace(username);
    res.send(`User space '${username}' created.`);
});

// Create a new bucket in a user space

router.post("/create-bucket", (req, res) => {
    const username = req.body.username;
    const bucketName = req.body.bucket;
    createBucket(username, bucketName);
    res.send(`Bucket '${bucketName}' created in user space '${username}'.`);
});

// List all buckets in a user space

router.get("/list-buckets/:username", (req, res) => {
    const username = req.params.username;
    listBuckets(username, (err, buckets) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading user space contents.");
        }
        res.json({ buckets });
    });
});

module.exports = router;
