
module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).send({ message: 'Please fill all fields' });
            }

        } catch (error) {

        }

    }
}