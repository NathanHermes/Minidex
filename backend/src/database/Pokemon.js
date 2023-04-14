import { connection } from "./Connection.js";
import { INTEGER, STRING, NOW, DATEONLY } from "sequelize";

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
