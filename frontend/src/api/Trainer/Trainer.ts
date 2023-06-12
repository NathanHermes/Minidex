import { api } from "../connection.ts";

export interface TrainerModel {
  id?: number;
  name?: string;
  email: string;
  password: string;
  experience?: number;
}

export const tokenValidate = async (token: string) => {
  return await api.post("/", null, {
    headers: {
      Authorization: token,
    },
  });
};

export const loginTrainer = async (trainer: TrainerModel) => {
  return await api.post("/login", {
    ...trainer,
  });
};

export const getTrainerByEmail = async (token: string, email: string) => {
  return await api.get(`/trainer/${email}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const saveTrainer = async (trainer: TrainerModel) => {
  await api.post("/trainer/save", {
    ...trainer,
  });
};

export const updateTrainer = async (token: string, trainer: TrainerModel) => {
  return await api.put(
    `/trainer/update/${trainer.id}`,
    {
      ...trainer,
    },
    {
      headers: { Authorization: token },
    }
  );
};
