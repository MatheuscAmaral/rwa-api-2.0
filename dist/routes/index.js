"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  registerRoutes: () => registerRoutes
});
module.exports = __toCommonJS(routes_exports);

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

// src/routes/products/get/getProductsAdm.ts
var getProductsAdm = (fastify) => __async(void 0, null, function* () {
  fastify.get("/products/adm", (request, reply) => __async(void 0, null, function* () {
    try {
      const products = yield db_default.products.findMany({
        orderBy: [
          { stock: "desc" },
          { title: "asc" }
        ]
      });
      reply.status(200).send(products);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getProductsAdm_default = getProductsAdm;

// src/routes/products/get/getProduct.ts
var getProduct = (fastify) => __async(void 0, null, function* () {
  fastify.get("/products/:id", (request, reply) => __async(void 0, null, function* () {
    const { id } = request.params;
    try {
      let products = yield db_default.products.findUnique({
        where: { product_id: Number(id) }
      });
      reply.status(200).send(products);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getProduct_default = getProduct;

// src/routes/products/get/searchProducts.ts
var searchProducts = (fastify) => __async(void 0, null, function* () {
  fastify.get("/products/search/:query", (request, reply) => __async(void 0, null, function* () {
    const { query } = request.params;
    try {
      let products;
      if (query == "todos") {
        products = yield db_default.products.findMany();
      } else {
        products = yield db_default.products.findMany({
          where: {
            title: {
              contains: query,
              mode: "insensitive"
            }
          }
        });
      }
      reply.status(200).send(products);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var searchProducts_default = searchProducts;

// src/routes/products/post/index.ts
var createProduct = (fastify) => __async(void 0, null, function* () {
  fastify.post("/products", (request, reply) => __async(void 0, null, function* () {
    const data = request.body;
    try {
      const products = yield db_default.products.create({
        data
      });
      reply.status(200).send(products);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var post_default = createProduct;

// src/routes/products/index.ts
var productsRoutes = (fastify) => __async(void 0, null, function* () {
  fastify.register(getProducts_default);
  fastify.register(getProductsAdm_default);
  fastify.register(getProduct_default);
  fastify.register(searchProducts_default);
  fastify.register(post_default);
});
var products_default = productsRoutes;

// src/routes/statistics/get/getStatistics.ts
var getStatistics = (fastify) => __async(void 0, null, function* () {
  fastify.get("/statistics", (request, reply) => __async(void 0, null, function* () {
    try {
      const products = yield db_default.products.count();
      const clients = yield db_default.users.count();
      const orders = yield db_default.orders.count();
      const statistics = {
        products,
        clients,
        orders
      };
      reply.status(200).send(statistics);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getStatistics_default = getStatistics;

// src/routes/statistics/index.ts
var statisticsRoutes = (fastify) => __async(void 0, null, function* () {
  fastify.register(getStatistics_default);
});
var statistics_default = statisticsRoutes;

// src/routes/orders/get/getOrderWithStatus.ts
var getOrderWithStatus = (fastify) => __async(void 0, null, function* () {
  fastify.get("/orders/:id/:status", (request, reply) => __async(void 0, null, function* () {
    const { id, status } = request.params;
    try {
      const orders = yield db_default.orders.findMany({
        where: __spreadValues({ client_id: Number(id) }, status != 0 && { status: Number(status) })
      });
      reply.status(200).send(orders);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getOrderWithStatus_default = getOrderWithStatus;

// src/routes/orders/post/index.ts
var createOrder = (fastify) => __async(void 0, null, function* () {
  fastify.post("/orders", (request, reply) => __async(void 0, null, function* () {
    const data = request.body;
    try {
      const order = yield db_default.orders.create({
        data: {
          total: data.total,
          discounts: data.discounts,
          client_id: data.clientId,
          shipping_cost: data.shippingCost,
          payment_method: Number(data.paymentMethod),
          zip_code: data.zipCode,
          street: data.street,
          city: data.city,
          uf: data.uf,
          number: Number(data.number),
          neighborhood: data.neighborhood,
          status: Number(data.status)
        }
      });
      const id = order.order_id;
      if (data && Array.isArray(data.productId) && data.productId.length > 0) {
        data.productId.map((productId, key) => __async(void 0, null, function* () {
          yield db_default.items_orders.create({
            data: {
              order_id: Number(id),
              product_id: Number(productId),
              quantity_ordered: Number(data.quantityOrdered[key]),
              quantity_served: Number(data.quantityServed[key]),
              discount_type: Number(data.discountType[key]),
              discount_value: Number(data.discountValue[key])
            }
          });
          const product = yield db_default.products.findUnique({
            where: { product_id: Number(productId) }
          });
          yield db_default.products.update({
            where: { product_id: Number(productId) },
            data: {
              stock: Number(product == null ? void 0 : product.stock) - Number(data.quantityServed)
            }
          });
        }));
      }
      reply.status(200).send(order);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var post_default2 = createOrder;

// src/routes/orders/get/getItemsOrder.ts
var getItemsOrder = (fastify) => __async(void 0, null, function* () {
  fastify.get("/orders/items/:id", (request, reply) => __async(void 0, null, function* () {
    const { id } = request.params;
    try {
      const orders = yield db_default.$queryRawUnsafe(`
                SELECT 
                    pi.id, pi.product_id, pi.order_id, pi.quantity_ordered, pi.quantity_served, pi.discount_type, pi.discount_value, 
                    pi."createdAt", pi."updatedAt", p.image, p.title, p.price, p.size, p.category, p.flavor, p.type_pack, p.stock
                FROM 
                    items_orders pi
                INNER JOIN 
                    products p ON p.product_id = pi.product_id
                WHERE 
                    pi.order_id = ${Number(id)}
            `);
      reply.status(200).send(orders);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getItemsOrder_default = getItemsOrder;

// src/routes/orders/get/getOrder.ts
var getOrder = (fastify) => __async(void 0, null, function* () {
  fastify.get("/orders/:id", (request, reply) => __async(void 0, null, function* () {
    const { id } = request.params;
    try {
      const orders = yield db_default.orders.findUnique({
        where: { order_id: Number(id) }
      });
      reply.status(200).send(orders);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getOrder_default = getOrder;

// src/routes/orders/get/getOrders.ts
var getOrders = (fastify) => __async(void 0, null, function* () {
  fastify.get("/orders", (request, reply) => __async(void 0, null, function* () {
    try {
      const orders = yield db_default.$queryRawUnsafe(`
               SELECT * FROM orders
               INNER JOIN users ON orders.client_id = users.id
               INNER JOIN payment_methods ON orders.payment_method = payment_methods.type
            `);
      reply.status(200).send(orders);
    } catch (error) {
      reply.status(500).send(error);
    }
  }));
});
var getOrders_default = getOrders;

// src/routes/orders/index.ts
var ordersRoutes = (fastify) => __async(void 0, null, function* () {
  fastify.register(getOrder_default);
  fastify.register(getOrders_default);
  fastify.register(getOrderWithStatus_default);
  fastify.register(getItemsOrder_default);
  fastify.register(post_default2);
});
var orders_default = ordersRoutes;

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

// src/plugins/cloudnary/index.ts
var import_dotenv2 = require("dotenv");
var cloudinary = require("cloudinary").v2;
(0, import_dotenv2.config)();
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
var post_default3 = uploadPostRoute;

// src/routes/index.ts
var registerRoutes = (app) => {
  app.register(orders_default);
  app.register(post_default3);
  app.register(products_default);
  app.register(statistics_default);
  app.register(users_default);
  app.register(paymentMethods_default);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerRoutes
});
