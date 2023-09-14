import express from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ error: 'Token is missing!' })
    }

    jwt.verify(token, "YOUR_SECRET", async (err, decoded) => {
        if(err) {
            return res.status(401).json({ error: 'Token is invalid!' })
        }

        req.user = decoded;
        next();
    });
}