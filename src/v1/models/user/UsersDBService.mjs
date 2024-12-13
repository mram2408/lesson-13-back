import User from "./User.mjs";
import CRUDManager from "../CRUDManager.mjs";

class UsersDBService extends CRUDManager {
  async getList(filters) {
    try {
      const res = await super.getList(filters, { password: 0 }, ["type"]);
      return res;
    } catch (error) {
      return [];
    }
  }
}

export default new UsersDBService(User);
