import express from "express";

const downloadRouter = express.Router();

downloadRouter.route('/pdf/:id').get(
    (req, res) => {
        const file = `uploads/pdf/${req.params.id}.pdf`;
        res.download(file); // Set disposition and send it.res.download('./uploads/pdf/Recept.pdf')
    }
)

export default downloadRouter;