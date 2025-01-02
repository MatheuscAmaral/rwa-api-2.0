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

// src/routes/orders/index.ts
var orders_exports = {};
__export(orders_exports, {
  default: () => orders_default
});
module.exports = __toCommonJS(orders_exports);

// db.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var db_default = prisma;

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
var post_default = createOrder;

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
  fastify.register(post_default);
});
var orders_default = ordersRoutes;
