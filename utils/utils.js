const fs = require('fs');
const path = require('path');

const baseDir = './S3Bucket';

// Function to create a new user 

function createUserSpace(username) {
    const userSpacePath = path.join(baseDir, username);
    if (!fs.existsSync(userSpacePath)) {
        fs.mkdirSync(userSpacePath);
        console.log(`User space '${username}' created.`);
    } else {
        console.log(`User space '${username}' already exists.`);
    }
}

// Function to create a new bucket 

function createBucket(username, bucketName) {
    const userSpacePath = path.join(baseDir, username);
    const bucketPath = path.join(userSpacePath, bucketName);
    if (!fs.existsSync(bucketPath)) {
        fs.mkdirSync(bucketPath);
        console.log(`Bucket '${bucketName}' created in user space '${username}'.`);
    } else {
        console.log(`Bucket '${bucketName}' already exists in user space '${username}'.`);
    }
}

// Function to list all buckets of a user 

function listBuckets(username, callback) {
    const userSpacePath = path.join(baseDir, username);    
    if (!fs.existsSync(userSpacePath)) {
        return callback(new Error(`User space '${username}' not found.`), null);
    }
    fs.readdir(userSpacePath, (err, files) => {
        if (err) {
            return callback(err, null);
        }
        const buckets = files.filter(file => fs.statSync(path.join(userSpacePath, file)).isDirectory());
        callback(null, buckets);
    });
}

// Function to list all items in a bucket

function listItems(username, bucketName, callback) {
    const bucketPath = path.join(baseDir, username, bucketName);

    if (!fs.existsSync(bucketPath)) {
        return callback(new Error(`Bucket '${bucketName}' not found in user space '${username}'.`), null);
    }

    fs.readdir(bucketPath, (err, files) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, files);
    });
}

module.exports = {
    createUserSpace,
    createBucket,
    listBuckets,
    listItems
};
