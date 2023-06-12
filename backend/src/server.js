import { app } from "./app.js";
import { config } from "dotenv";

config();
const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => {
  console.log(`\u001b[34mServer: running in port ${port}...\u001b[37m`);
});
