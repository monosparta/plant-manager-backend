import { randomUUID } from 'crypto';
import multer from 'multer';
import { extname } from 'path';

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, `${randomUUID()}${extname(file.originalname)}`); //Appending extension
    }
});

export const upload = multer({ storage });
