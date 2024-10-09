import User from '../models/userModel';
import bcrypt from 'bcrypt';
import Token from '../helpers/token';

class AuthService {
  static async register(req, res) {
    try {
      const { firstname, lastname, email, password, role } = req.body;

      const checkUser = await User.findOne({ email })
      if (checkUser) {
        return { type: false, message: 'This User already exist,please check your email or password' }
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role
      })

      await newUser.save()

      return {
        type: true, data:
        {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          role: newUser.role
        },
        message: 'User created successfully'
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        if (error.errors && error.errors.role) {
          return { type: false, message: 'Invalid role. Role must be either "admin" or "user".' };
        }
      }
      return { type: false, message: 'An error occurred during registration' };
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ "email": email })
    if (!checkUser) {
      return { type: false, message: 'User not found' }
    }

    const comparePassword = bcrypt.compareSync(password, checkUser.password)

    if (!comparePassword) {
      return { type: false, message: 'Username or password is not correct. Please Check.' }
    }
    const token = await Token.generateToken(checkUser);
    return { type: true, data: token, message: 'User logged in successfully' }
  }
}

export default AuthService;