import { INTEGER, STRING } from "sequelize";
import { connection } from "./Connection.js";

export const Trainer = connection.define("trainer", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    primaryKey: false,
    type: STRING,
  },
  experience: {
    allowNull: null,
    autoIncrement: false,
    defaultValue: 0,
    primaryKey: false,
    type: INTEGER,
  },
});
