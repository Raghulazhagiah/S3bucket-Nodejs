# Local File Storage System

This project is a Node.js-based REST API that provides file management capabilities using a local file system structure. It implements a user-space and bucket-based storage system similar to S3, but stores files locally in the filesystem.

## Features

- User-based file organization
- Bucket-based storage within user spaces
- File upload with unique identifiers
- File download capabilities
- File listing and management
- Multi-user support

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-directory
```

2. Install dependencies:
```bash
npm install
```

3. Create the base storage directory:
```bash
mkdir S3Bucket
```

## Project Structure

```
├── S3Bucket/             # Base directory for all file storage
│   └── {username}/      # User-specific directories
│       └── {bucket}/    # Bucket directories within user space
├── app.js               # Main application entry point
├── routes/
│   ├── fileRoutes.js   # File management routes
│   └── userRoutes.js   # User authentication routes
├── utils/
│   └── utils.js        # Utility functions and middleware
└── package.json        # Project dependencies and scripts
```

## Storage Structure

The system organizes files in a hierarchical structure:
- Each user gets their own space under `S3Bucket/{username}`
- Within each user's space, they can create multiple buckets
- Files are stored in the respective bucket directories with unique UUIDs

## API Endpoints

### File Routes
- `POST /upload` - Upload file to a specific bucket in user space
  - Required form fields: `username`, `bucket`, `file`
- `GET /list-items/:username/:bucket` - List all files in a bucket
- `GET /download/:username/:bucket/:filename` - Download a specific file
- `DELETE /delete/:username/:bucket/:filename` - Delete a specific file

### User Routes
- `POST /signup` - Register a new user
- `POST /login` - Login and get JWT token

## Dependencies

- express: ^4.19.2 - Web framework
- jsonwebtoken: ^9.0.2 - JWT authentication
- multer: ^1.4.5-lts.1 - File upload handling
- uuid: ^10.0.0 - Unique identifier generation

## Running the Application

Start the server:
```bash
node app.js
```

The server will start running on port 3001.

## File Handling Features

- Automatic user space creation
- Automatic bucket creation
- UUID-based unique filenames
- Hierarchical storage structure
- Stream-based file downloads

## Error Handling

The API includes comprehensive error handling for:
- Missing directories/files
- Invalid user spaces
- Invalid bucket names
- File operation failures
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 