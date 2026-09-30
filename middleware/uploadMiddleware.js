const multer = require("multer");
const path = require("path");
const fs = require("fs");


// UPLOAD DIRECTORY

const uploadDirectory = path.join(
    __dirname,
    "../uploads"
);


// Create uploads folder if it does not exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(
        uploadDirectory,
        {
            recursive: true
        }
    );
}

// STORAGE

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            uploadDirectory
        );
    },


    filename: (req, file, cb) => {

        const extension =
            path.extname(
                file.originalname
            ).toLowerCase();


        const safeName =
            path
                .basename(
                    file.originalname,
                    extension
                )
                .replace(
                    /[^a-zA-Z0-9-_]/g,
                    "-"
                );


        const uniqueName =
            `${Date.now()}-${safeName}${extension}`;


        cb(
            null,
            uniqueName
        );
    }
});


// FILE FILTER

const fileFilter = (
    req,
    file,
    cb
) => {

    const extension =
        path.extname(
            file.originalname
        ).toLowerCase();


    const isPDF =
        file.mimetype ===
            "application/pdf" &&
        extension === ".pdf";


    if (!isPDF) {

        return cb(
            new Error(
                "Only PDF files are allowed"
            )
        );
    }


    cb(
        null,
        true
    );
};


// MULTER

const upload = multer({

    storage: storage,

    limits: {
        fileSize:
            5 * 1024 * 1024
    },

    fileFilter:
        fileFilter
});


module.exports = upload;