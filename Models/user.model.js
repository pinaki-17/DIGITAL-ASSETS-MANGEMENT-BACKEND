const { getDb } = require("../Db/Db");
const bcrypt = require("bcrypt");

const UserModel = {
  async createUser(data) {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userProfile = {
      assetsId: data.assetsId,
      password: hashedPassword,
      createdAt: new Date(),
    };
    const result = await db.collection("Users").insertOne(userProfile);
    return result.insertedId;
  },

  async getUserById(assetsId) {
    const db = getDb();
    return await db.collection("Users").findOne({ assetsId });
  },

  async updatePassword(assetsId, newPassword) {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await db
      .collection("Users")
      .updateOne({ assetsId }, { $set: { password: hashedPassword } });
  },

  async deleteUser(assetsId) {
    const db = getDb();
    return await db.collection("Users").deleteOne({ assetsId });
  },

  async findByLogin(assetsId, password) {
    const db = getDb();
    const user = await db.collection("Users").findOne({ assetsId });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  },
};

module.exports = UserModel;
