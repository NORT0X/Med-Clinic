import express from 'express';
import jwt from 'jsonwebtoken';


export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ error: 'Token is missing!' })
    }

    console.log('Token: ' + token);

    try {
        const decoded = jwt.verify(token, "YOUR_SECRET");
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authorization denied. Invalid token'})
    }
}

export const managerAuth = async (req,  res, next) => {
    let user = req.user
    console.log("managerAuth")
    if (user.userType != "Manager") {
      return res.status(403).json({ error: 'Only manager can access this data!'})
    }

    next()
}
