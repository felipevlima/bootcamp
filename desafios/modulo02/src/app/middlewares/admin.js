import User from '../models/User';

export default async (req, res, next) => {
    const { provider } = await User.findByPk(req.userId);

    if (!provider) {
        return res.status(400).json({ error: 'user not authorization' });
    }

    return next();
};
