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

// src/routes/paymentMethods/index.ts
var paymentMethods_exports = {};
__export(paymentMethods_exports, {
  default: () => paymentMethods_default
});
module.exports = __toCommonJS(paymentMethods_exports);

// db.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var db_default = prisma;

// src/routes/paymentMethods/get/getPayments.ts
var getPayments = (fastify) => __async(void 0, null, function* () {
  fastify.get("/payments", (request, reply) => __async(void 0, null, function* () {
    try {
      const payments = yield db_default.payment_methods.findMany({
        where: { status: 1 }
      });
      reply.status(200).send(payments);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getPayments_default = getPayments;

// src/routes/paymentMethods/post/createPayment.ts
var createPayment = (fastify) => __async(void 0, null, function* () {
  fastify.post("/payments", (request, reply) => __async(void 0, null, function* () {
    const data = request.body;
    try {
      const payments = yield db_default.payment_methods.create({
        data
      });
      reply.status(200).send(payments);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var createPayment_default = createPayment;

// src/routes/paymentMethods/index.ts
var paymentMethodsRoutes = (fastify) => __async(void 0, null, function* () {
  fastify.register(getPayments_default);
  fastify.register(createPayment_default);
});
var paymentMethods_default = paymentMethodsRoutes;
