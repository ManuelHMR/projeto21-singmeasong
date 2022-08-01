import { clearRepository } from "./../repositories/testRepository.js";

export async function clearService() {
  await clearRepository();
}