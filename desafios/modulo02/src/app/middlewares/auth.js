import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provider' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decode.id;
        return next();
    } catch (e) {
        return res.status(401).json({ erro: 'Invalid Token' });
    }
};
