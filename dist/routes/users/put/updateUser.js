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

// src/routes/users/put/updateUser.ts
var updateUser_exports = {};
__export(updateUser_exports, {
  default: () => updateUser_default
});
module.exports = __toCommonJS(updateUser_exports);

// db.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var db_default = prisma;

// src/routes/users/put/updateUser.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var updateUser = (fastify) => __async(void 0, null, function* () {
  fastify.put("/users/password/:id", (request, reply) => __async(void 0, null, function* () {
    const { id } = request.params;
    const data = request.body;
    const password = yield import_bcryptjs.default.hash(data.password, 10);
    try {
      const user = yield db_default.users.findUnique({
        where: {
          id: Number(id)
        }
      });
      if (user) {
        const isPasswordValid = yield import_bcryptjs.default.compare(data.old_password, String(user == null ? void 0 : user.password));
        if (isPasswordValid) {
          const userUpdate = yield db_default.users.update({
            where: { id: Number(id) },
            data: {
              password: String(password)
            }
          });
          reply.status(200).send(userUpdate);
        } else {
          reply.status(500).send({ error: "A senha atual est\xE1 incorreta!" });
        }
      }
    } catch (error) {
      reply.status(500).send({ error });
    }
  }));
});
var updateUser_default = updateUser;
