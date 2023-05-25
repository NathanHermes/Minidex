import { INTEGER, STRING, NOW, DATEONLY } from "sequelize";
import { connection } from "./Connection.js";
import { Trainer } from "./Trainer.js";

export const Pokemon = connection.define("pokemon", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  nickname: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
    unique: true,
  },
  name: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
  },
  height: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: INTEGER,
  },
  weight: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: INTEGER,
  },
  type: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
  },
  urlImage: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
  },
  experience: {
    allowNull: false,
    primaryKey: false,
    type: INTEGER,
  },
  capturedAt: {
    allowNull: false,
    defaultValue: NOW,
    primaryKey: false,
    type: DATEONLY,
  },
});

Pokemon.belongsTo(Trainer, {
  constraints: true,
  foreignKey: "id_trainer",
});

Trainer.hasMany(Pokemon, {
  foreignKey: "id_trainer",
});
