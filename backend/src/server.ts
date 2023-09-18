import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routers/user.routes';
import managerRouter from './routers/manager.routes';
import appointmentRouter from './routers/appointment.routes';
import notificationRouter from './routers/notification.routes';
import downloadRouter from './routers/download.routes';

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/piaDB')
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/manager', managerRouter);
router.use('/appointment', appointmentRouter);
router.use('/notification', notificationRouter);
router.use('/download', downloadRouter)

app.use('/', router);
app.use('/uploads/images', express.static('uploads/images'));
app.listen(4000, () => console.log(`Express server running on port 4000`));