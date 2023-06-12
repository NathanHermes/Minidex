import { isNullOrEmpty, objectIsEmpty } from "../utils/validator.js";
import { hash } from "bcrypt";

export const validateTrainerBody = async (request, response, next) => {
  const { body } = request;

  if (objectIsEmpty(body))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Body of request is empty.",
      data: body,
    });

  const { name, email, password } = request.body;
  /**
   * Verify that name of trainer not is undefined, null or empty
   */

  if (name === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Name is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(name))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Name is null or empty.",
      data: body,
    });

  /**
   * Verify that email of trainer not is undefined, null or empty
   */

  if (email === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Email is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(email))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Email is null or empty.",
      data: body,
    });

  /**
   * Verify that password of trainer not is undefined, null or empty
   */

  if (password === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Password is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(password))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Password is null or empty.",
      data: body,
    });

  const hashPassword = await hash(password, 10);
  request.body = {
    name: name,
    email: email,
    password: hashPassword,
  };

  next();
};

export const validateLoginBody = (request, response, next) => {
  const { body } = request;

  if (objectIsEmpty(body))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Body of request is empty.",
      data: body,
    });

  const { email, password } = request.body;

  /**
   * Verify that email of trainer not is undefined, null or empty
   */
  if (email === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Email is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(email))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Email is null or empty.",
      data: body,
    });

  /**
   * Verify that password of trainer not is undefined, null or empty
   */
  if (password === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Password is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(password))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Password is null or empty.",
      data: body,
    });

  next();
};
