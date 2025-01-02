import buildApp from "./app";
import dotenv from 'dotenv';

dotenv.config();

const app = buildApp();

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then((host) => {
  console.log(`Server is running on ${host}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});