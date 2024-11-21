import buildApp from "./app";
import dotenv from 'dotenv';

dotenv.config();

const app = buildApp();

app.listen({ port: 3333 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
});