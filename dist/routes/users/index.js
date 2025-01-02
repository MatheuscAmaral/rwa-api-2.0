"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// src/routes/users/index.ts
var users_exports = {};
__export(users_exports, {
  default: () => users_default
});
module.exports = __toCommonJS(users_exports);

// db.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var db_default = prisma;

// src/routes/users/get/getUser.ts
var getUser = (fastify) => __async(void 0, null, function* () {
  fastify.get("/users/:id", (request, reply) => __async(void 0, null, function* () {
    const { id } = request.params;
    try {
      const user = yield db_default.users.findUnique({
        where: {
          id: Number(id)
        }
      });
      reply.status(200).send(user);
    } catch (error) {
      reply.status(500).send({ error });
    }
  }));
});
var getUser_default = getUser;

// src/routes/users/get/getUsers.ts
var getUsers = (fastify) => __async(void 0, null, function* () {
  fastify.get("/users", (request, reply) => __async(void 0, null, function* () {
    try {
      const users = yield db_default.users.findMany();
      reply.status(200).send(users);
    } catch (error) {
      reply.status(500).send({ error: "Failed to retrieve users" });
    }
  }));
});
var getUsers_default = getUsers;

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

// src/routes/users/post/signIn.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var signInUser = (fastify) => __async(void 0, null, function* () {
  fastify.post("/users/sign-in", (request, reply) => __async(void 0, null, function* () {
    const data = request.body;
    try {
      const user = yield db_default.users.findUnique({
        where: {
          cpf: data.cpf
        }
      });
      if (!user) {
        return reply.status(404).send({ error: "Usu\xE1rio n\xE3o encontrado!" });
      }
      const isValidPassword = yield import_bcryptjs2.default.compare(data.password, user.password);
      if (!isValidPassword) {
        return reply.status(500).send({ error: "Senha incorreta!" });
      } else {
        const _a = user, { password } = _a, userWithoutPassword = __objRest(_a, ["password"]);
        return reply.status(200).send(userWithoutPassword);
      }
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var signIn_default = signInUser;

// src/routes/users/post/signUp.ts
var import_bcryptjs3 = __toESM(require("bcryptjs"));
var signUpUser = (fastify) => __async(void 0, null, function* () {
  fastify.post("/users/sign-up", (request, reply) => __async(void 0, null, function* () {
    const data = request.body;
    const password = yield import_bcryptjs3.default.hash(data.password, 10);
    try {
      const user = yield db_default.users.create({
        data: {
          name: data.name,
          email: data.email,
          password,
          cpf: data.cpf,
          zip_code: Number(data.zipCode),
          street: data.street,
          city: data.city,
          uf: data.uf,
          number: Number(data.number),
          neighborhood: data.neighborhood
        }
      });
      const _a = user, { password: userPasword } = _a, userWithoutPassword = __objRest(_a, ["password"]);
      return reply.status(200).send(userWithoutPassword);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var signUp_default = signUpUser;

// src/routes/users/index.ts
var userRoutes = (fastify) => __async(void 0, null, function* () {
  fastify.register(getUsers_default);
  fastify.register(getUser_default);
  fastify.register(signIn_default);
  fastify.register(signUp_default);
  fastify.register(usersVerify_default);
  fastify.register(updateUser_default);
});
var users_default = userRoutes;
