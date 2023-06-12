import { verify } from "jsonwebtoken";

export async function verifyToken(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization)
    return response.status(401).json({
      code: 401,
      status: "Unauthorized",
      description: "Token not found.",
      data: request.headers,
    });

  verify(authorization, process.env.JWT_KEY, function (error, decoded) {
    if (error)
      return response.status(400).json({
        code: 400,
        status: "Bad Request",
        description: "Invalid token.",
        data: {
          authenticate: false,
          message: "Failed to authenticate token.",
        },
      });

    const { id, email } = decoded;
    request.trainer_info = { id, email };
    next();
  });
}
