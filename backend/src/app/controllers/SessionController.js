import jwt from 'jsonwebtoken';
import autConfig from '../../config/auth';
import User from '../model/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Verfica se o e-mail do usuario existe
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, autConfig.secret, {
        expiresIn: autConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
