import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const studentExist = Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExist) {
            res.status(400).json({ error: 'Student already exists.' });
        }

        const { name, email, age, weight, height } = req.body;

        return res.json({
            name,
            email,
            age,
            weight,
            height,
        });
    }
}

export default new StudentController();
