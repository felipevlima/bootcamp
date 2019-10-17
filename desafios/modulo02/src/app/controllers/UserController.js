import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            res.status(400).json({ error: 'User already exists.' });
        }

        const { id, name, email, provider } = User.create(req.body);

        res.json({
            id,
            name,
            email,
            provider,
        });
    }
}

export default new UserController();
