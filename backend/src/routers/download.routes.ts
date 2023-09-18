import express from "express";

const downloadRouter = express.Router();

downloadRouter.route('/pdf/:id').get(
    async (req, res) => {
        try {
            const file = `uploads/pdf/${req.params.id}.pdf`;
            return res.download(file); // Set disposition and send it.res.download('./uploads/pdf/Recept.pdf')
    
        } catch (error) {
            return res.status(500).json({ error: 'Failed to download file' });
        }
    }
)

export default downloadRouter;