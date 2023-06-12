import Jwt from "jsonwebtoken";
import {
  findAllTrainers,
  findOneByEmail,
  createTrainer,
  updateTrainer,
  destroyTrainer,
} from "../models/TrainerModel.js";
import { objectIsEmpty } from "../utils/validator.js";
import { compare } from "bcrypt";

export async function login(request, response) {
  const { email, password } = request.body;

  const trainer = await findOneByEmail(email);
  if (!trainer)
    return response.status(404).json({
      code: 404,
      status: "Not Found",
      description: "Trainer not found.",
      data: trainer,
    });

  const verifyPass = await compare(password, trainer.password);
  if (!verifyPass)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Invalid password.",
      data: request.body,
    });

  const token = Jwt.sign(
    { id: trainer.id, email: email },
    process.env.JWT_KEY,
    {
      expiresIn: "4h",
    }
  );

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Login success.",
    data: {
      authenticate: true,
      token: token,
    },
  });
}

export const getAllTrainers = async (request, response) => {
  const trainers = await findAllTrainers();

  if (objectIsEmpty(trainers))
    return response.status(404).json({
      code: 404,
      status: "Not Found",
      description: "Trainers not found.",
      data: trainers,
    });
  else
    return response.status(200).json({
      code: 200,
      status: "OK",
      description: "Trainers found.",
      data: trainers,
    });
};

export const getTrainerByEmail = async (request, response) => {
  const { email } = request.params;
  const trainer = await findOneByEmail(email);

  if (!trainer)
    return response.status(404).json({
      code: 404,
      status: "Not Found",
      description: "Trainer not found.",
      data: {},
    });
  else
    return response.status(200).json({
      code: 200,
      status: "OK",
      description: "Trainer found.",
      data: trainer,
    });
};

export const saveTrainer = async (request, response) => {
  const { email } = request.body;
  let trainer = await findOneByEmail(email);

  if (trainer)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Trainer already exists.",
      data: trainer,
    });

  trainer = await createTrainer(request.body);
  return response.status(201).json({
    code: 201,
    status: "Created",
    decription: "Trainer created",
    data: trainer,
  });
};

export const updateTrainerInfo = async (request, response) => {
  const { email } = request.body;
  const { id } = request.params;

  let trainer = await findOneByEmail(email);

  if (trainer !== null && trainer.id != id)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Email already exists.",
      data: trainer,
    });

  trainer = await updateTrainer(id, request.body);
  if (!trainer)
    return response.status(404).json({
      code: 404,
      status: "Not found",
      description: "Trainer not found.",
      data: {},
    });
  else
    return response.status(200).json({
      code: 200,
      status: "OK",
      description: "Trainer updated.",
      data: trainer,
    });
};

export const deleteTrainer = async (request, response) => {
  const { id } = request.params;
  const trainer = await destroyTrainer(id);

  if (!trainer)
    return response.status(404).json({
      code: 404,
      status: "Not found",
      description: "Trainer not found.",
      data: {},
    });

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Trainer deleted.",
    data: trainer,
  });
};
