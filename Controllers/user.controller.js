const UserModel = require("../Models/user.model");

// Create a new user
async function createUser(req, res) {
  try {
    const userId = await UserModel.createUser(req.body);
    res.status(201).json({ message: "User created", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
}

// Get user by assetsId
async function getUserById(req, res) {
  try {
    const user = await UserModel.getUserById(req.params.assetsId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user", details: err.message });
  }
}

// Update user password
async function updatePassword(req, res) {
  try {
    const { assetsId } = req.params;
    const { password } = req.body;
    const result = await UserModel.updatePassword(assetsId, password);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found or password unchanged" });
    }
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password", details: err.message });
  }
}

// Delete user by assetsId
async function deleteUser(req, res) {
  try {
    const result = await UserModel.deleteUser(req.params.assetsId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user", details: err.message });
  }
}

// Login user
async function login(req, res) {
  try {
    const { assetsId, password } = req.body;
    console.log('Login payload:', req.body);

    const user = await UserModel.findByLogin(assetsId, password);
    console.log('User found:', user);

    if (!user) {
      console.log('No user found with provided credentials');
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session = req.session || {};
    req.session.user = { assetsId: user.assetsId };
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
}

// Logout user
async function logout(req, res) {
  try {
    if (req.session) {
      req.session.user = null;
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Logout failed", details: err.message });
  }
}

module.exports = {
  createUser,
  getUserById,
  updatePassword,
  deleteUser,
  login,
  logout,
};