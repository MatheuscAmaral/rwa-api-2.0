"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routes/users/post/usersVerify.ts
var usersVerify_exports = {};
__export(usersVerify_exports, {
  default: () => usersVerify_default
});
module.exports = __toCommonJS(usersVerify_exports);

// db.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var db_default = prisma;

// src/routes/users/post/usersVerify.ts
var usersVerify = (fastify) => __async(void 0, null, function* () {
  fastify.post("/users/verify", (request, reply) => __async(void 0, null, function* () {
    const { cpf, email } = request.body;
    try {
      const userByCpf = yield db_default.users.findFirst({
        where: {
          cpf
        }
      });
      const userByEmail = yield db_default.users.findFirst({
        where: {
          email
        }
      });
      if (userByCpf && userByEmail) {
        return reply.status(404).send({ error: "O usu\xE1rio j\xE1 foi cadastrado!" });
      } else if (userByCpf) {
        return reply.status(404).send({ error: "O cpf j\xE1 foi cadastrado!" });
      } else if (userByEmail) {
        return reply.status(404).send({ error: "O e-mail j\xE1 foi cadastrado!" });
      }
      reply.status(200).send(false);
    } catch (error) {
      reply.status(500).send({ error });
    }
  }));
});
var usersVerify_default = usersVerify;
