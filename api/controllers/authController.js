import AuthService from "../services/authService";

class AuthController {

  static async register(req, res) {
    try {
      const result = await AuthService.register(req, res);
      return res.status(result.type ? 201 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }


  static async login(req, res) {
    try {
      const result = await AuthService.login(req, res);
      return res.status(result.type ? 200 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

}

export default AuthController;