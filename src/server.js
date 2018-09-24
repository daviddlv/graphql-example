"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("reflect-metadata");
var apollo_server_express_1 = require("apollo-server-express");
var dotenv = require("dotenv");
var errorHandler = require("errorhandler");
var express = require("express");
var graphql_1 = require("graphql");
var morgan = require("morgan");
var TypeGraphQL = require("type-graphql");
var typedi_1 = require("typedi");
var TypeORM = require("typeorm");
var user_1 = require("./models/user");
var schema_1 = require("./schema");
TypeGraphQL.useContainer(typedi_1.Container);
TypeORM.useContainer(typedi_1.Container);
function setupGraphQLServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, schema, server;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = express();
                    /*
                    const authMiddleware = jwt({
                      credentialsRequired: false,
                      secret: process.env.TOKEN_SECRET
                    });
                    */
                    // app.use('/graphql', authMiddleware);
                    app.use('/graphql', function (req, res, done) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(req.user !== undefined)) return [3 /*break*/, 2];
                                    _a = req;
                                    return [4 /*yield*/, TypeORM.getRepository(user_1.User).findOne(req.user)];
                                case 1:
                                    _a.user = _b.sent();
                                    _b.label = 2;
                                case 2:
                                    done();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.use(morgan('combined'));
                    app.use(errorHandler());
                    return [4 /*yield*/, schema_1.getSchema()];
                case 1:
                    schema = _a.sent();
                    app.use('/schema', function (req, res, _next) {
                        res.set('Content-Type', 'text/plain');
                        res.send(graphql_1.printSchema(schema));
                    });
                    server = new apollo_server_express_1.ApolloServer({
                        context: function (_a) {
                            var req = _a.req;
                            return ({
                                user: req.user
                            });
                        },
                        engine: {
                            apiKey: process.env.ENGINE_API_KEY
                        },
                        schema: schema,
                        uploads: true
                    });
                    server.applyMiddleware({ app: app });
                    return [2 /*return*/, app];
            }
        });
    });
}
exports.setupGraphQLServer = setupGraphQLServer;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TypeORM.createConnection()];
                case 1:
                    _a.sent();
                    dotenv.config();
                    return [4 /*yield*/, setupGraphQLServer()];
                case 2:
                    app = _a.sent();
                    /*
                    const options = {
                      cert:  fs.readFileSync('/certs/bricoccaz.com/cert.pem'),
                      key: fs.readFileSync('/certs/bricoccaz.com/privkey.pem')
                    };
                  
                    spdy
                      .createServer(options, app)
                      .listen(process.env.GRAPHQL_PORT, () => {
                        console.log(`Server ready`);
                      });
                    */
                    app.listen({
                        port: process.env.GRAPHQL_PORT
                    }, function () {
                        console.log("Server ready");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap()["catch"](function (err) {
    console.log(err);
});
