const jwt = require('jsonwebtoken');
const db = require('../models');

const profileController = async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
            res.status(403).send({ message: 'Token not valid' });
        } else {
            try {
                const user = await db.User.findByPk(authData.sub, {
                    include: [
                        {
                            model: db.Clinic,
                            attributes: ['clinic_name']
                        },
                    ],
                    
                });
                if (user) {
                    res.json(
                        {
                            id: user.id,
                            email: user.email,
                            status:user.status,
                            user_role: user.user_role,
                        }
                    );
                } else {
                    res.status(404).send({ message: 'User not found' });
                }
            } catch (error) {
                res.status(500).send({ message: 'Error fetching user data' });
            }
        }
    });
};

module.exports = profileController;
