const { getDb } = require("../Db/Db");

const UserModel = {
  // Create a new user
  async createUser(data) {
    const db = getDb();
    const userProfile = {
      assetsId: data.assetsId, // user ID
      password: data.password, // hashed password recommended
      createdAt: new Date(),
    };
    const result = await db.collection("Users").insertOne(userProfile);
    return result.insertedId;
  },

  // Get user by assetsId (user ID)
  async getUserById(assetsId) {
    const db = getDb();
    return await db.collection("Users").findOne({ assetsId });
  },

  // Update user password
  async updatePassword(assetsId, newPassword) {
    const db = getDb();
    return await db
      .collection("Users")
      .updateOne({ assetsId }, { $set: { password: newPassword } });
  },

  // Delete user by assetsId
  async deleteUser(assetsId) {
    const db = getDb();
    return await db.collection("Users").deleteOne({ assetsId });
  },
};

module.exports = UserModel;