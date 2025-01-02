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

// src/routes/products/get/getProducts.ts
var getProducts_exports = {};
__export(getProducts_exports, {
  default: () => getProducts_default
});
module.exports = __toCommonJS(getProducts_exports);

// db.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var db_default = prisma;

// src/routes/products/get/getProducts.ts
var getProducts = (fastify) => __async(void 0, null, function* () {
  fastify.get("/products", (request, reply) => __async(void 0, null, function* () {
    try {
      const productsWhey = yield db_default.products.findMany({
        where: { category: "1" },
        orderBy: [
          {
            stock: "desc"
          },
          {
            title: "asc"
          }
        ]
      });
      const productsCreatina = yield db_default.products.findMany({
        where: { category: "2" },
        orderBy: [
          {
            stock: "desc"
          },
          {
            title: "asc"
          }
        ]
      });
      const productsOthers = yield db_default.products.findMany({
        where: { category: "3" },
        orderBy: [
          {
            stock: "desc"
          },
          {
            title: "asc"
          }
        ]
      });
      const products = {
        whey: productsWhey,
        creatina: productsCreatina,
        others: productsOthers
      };
      reply.status(200).send(products);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getProducts_default = getProducts;
