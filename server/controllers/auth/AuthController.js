import bcrypt from "bcrypt";
import User from "../../models/User.js";

export const getCurrentUser = (req, res) => {
  // Check if there's a user in the session
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  // Return the user data from session
  res.json({ user: req.session.user });
};

// In AuthController.js
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log('Registering user:', { username, email });

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.error('Email already in use');
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ username, email, password: hashedPassword });

    console.log('User registered:', user);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error('Registration failed:', err.message);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt:', { email });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = { id: user.id, username: user.username, email: user.email };

    console.log('User logged in:', req.session.user);

    res.json({ message: 'Logged in successfully', user: req.session.user });
  } catch (err) {
    console.error('Login failed:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};



export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // Default session cookie name
    res.json({ message: "Logged out successfully" });
  });
};

export const updateUser = async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

  const { username, email, newPassword } = req.body;
  const userId = req.session.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username;
    user.email = email;

    if (newPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
    }

    await user.save();

    // Optional: update session
    req.session.user.username = user.username;
    req.session.user.email = user.email;

    res.json({ message: "User updated", user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

