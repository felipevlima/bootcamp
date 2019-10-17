import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: 'Token not provider' });
    }

    const [, token] = authorization.split(' ');

    try {
        const decode = await promisify(jwt.decode)(token, authConfig.secret);

        req.userId = decode.id;

        return next();
    } catch (e) {
        return res.status(401).json({ erro: 'Invalid Token' });
    }
};
