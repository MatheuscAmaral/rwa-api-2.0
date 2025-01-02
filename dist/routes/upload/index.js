"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/routes/upload/index.ts
var upload_exports = {};
__export(upload_exports, {
  default: () => upload_default
});
module.exports = __toCommonJS(upload_exports);

// src/plugins/cloudnary/index.ts
var import_dotenv = require("dotenv");
var cloudinary = require("cloudinary").v2;
(0, import_dotenv.config)();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var cloudnary_default = cloudinary;

// src/routes/upload/post/index.ts
var uploadPostRoute = (fastify) => __async(void 0, null, function* () {
  fastify.post("/upload", (request, reply) => __async(void 0, null, function* () {
    const file = yield request.file();
    if (!file) {
      return reply.status(400).send({ error: "Nenhum arquivo enviado!" });
    }
    try {
      const result = yield new Promise((resolve, reject) => {
        const stream = cloudnary_default.uploader.upload_stream({ folder: "uploads" }, (error, result2) => {
          if (error) {
            reject(error);
          } else {
            resolve(result2);
          }
        });
        file.file.pipe(stream);
      });
      return reply.status(201).send(result);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      return reply.status(500).send({ error });
    }
  }));
});
var post_default = uploadPostRoute;

// src/routes/upload/index.ts
var uploadRoutes = (fastify) => __async(void 0, null, function* () {
  fastify.register(post_default);
});
var upload_default = uploadRoutes;
