import { userRepository } from "../repositories/userRepository.js";

class UserService {
  async getAll() {
    return await userRepository.getAll();
  }
 
  async create(data) {
    const createdUser = await userRepository.create(data);
    return createdUser;
  }
  async update(id, data) {
    const updatedUser = await userRepository.update(id, data);
    if (!updatedUser) return null;
    return updatedUser;
  }
  async delete(id) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) return null;
    return deletedUser;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
