import express from "express";
import multer from "multer";
import fs from "fs";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

// Define storage for the images
const storage = multer.diskStorage({
    // Destination for files
    destination: function (req, file, callback) {
        fs.mkdirSync('./uploads/images', { recursive: true })
        callback(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
})

userRouter.route('/register').post(
    upload.single('image'),
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/changeImage').post(
    upload.single('image'),
    (req, res) => new UserController().changeProfilePicture(req, res)
)

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/editUser').post(
    (req, res) => new UserController().editUser(req, res)
)

userRouter.route('/:id').get(
    (req, res) => new UserController().getUserById(req, res)
)

export default userRouter;