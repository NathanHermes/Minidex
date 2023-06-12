import { connection } from "../database/Connection.js";
import { Trainer } from "../database/Trainer.js";

export const findAllTrainers = async () => {
  await connection.sync();

  return await Trainer.findAll({
    attributes: ["id", "name", "email", "password", "experience"],
  });
};

export const findOneByEmail = async (email) => {
  await connection.sync();

  return await Trainer.findOne({
    attributes: ["id", "name", "email", "password", "experience"],
    where: { email: email },
  });
};

export const createTrainer = async (trainer) => {
  await connection.sync();

  return await Trainer.create(trainer);
};

export const updateTrainer = async (id, trainer) => {
  await connection.sync();

  const _trainer = await Trainer.findOne({
    attributes: ["id", "name", "email", "password", "experience"],
    where: { id: id },
  });

  if (!_trainer) return _trainer;
  else {
    _trainer.set(trainer);
    return await _trainer.save();
  }
};

export const destroyTrainer = async (id) => {
  await connection.sync();

  const _trainer = await Trainer.findOne({
    attributes: ["id", "name", "email", "password", "experience"],
    where: { id: id },
  });

  if (!_trainer) return _trainer;
  else return _trainer.destroy();
};
