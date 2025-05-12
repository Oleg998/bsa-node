import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async getAll() {
    return await fighterRepository.getAll();
  }

  async getById(id) {
    const fighter = await fighterRepository.getById(id);
    return fighter || null;
  }

  async create(data) {
    const createdFighter = await fighterRepository.create(data);
    return createdFighter;
  }

  async update(id, data) {
    const updatedFighter = await fighterRepository.update(id, data);
    return updatedFighter || null;
  }

  async delete(id) {
    const deletedFighter = await fighterRepository.delete(id);
    return deletedFighter || null;
  }

  async search(search) {
    const item = await fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();
export { fighterService };
