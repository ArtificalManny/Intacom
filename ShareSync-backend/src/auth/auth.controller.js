"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AuthController = function () {
    var _classDecorators = [(0, common_1.Controller)('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _register_decorators;
    var _login_decorators;
    var _forgotPassword_decorators;
    var _resetPassword_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        AuthController_1.prototype.register = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var email, firstName, lastName, password, existingUser, hashedPassword, user, access_token, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Received register request:', body);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            email = body.email, firstName = body.firstName, lastName = body.lastName, password = body.password;
                            if (!email || !firstName || !lastName || !password) {
                                console.log('Missing required fields');
                                throw new common_1.HttpException('All fields are required', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.authService.findByEmail(email)];
                        case 2:
                            existingUser = _a.sent();
                            if (existingUser) {
                                console.log('User already exists:', email);
                                throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, bcrypt.hash(password, 10)];
                        case 3:
                            hashedPassword = _a.sent();
                            console.log('Hashed password:', hashedPassword);
                            return [4 /*yield*/, this.authService.createUser({ email: email, firstName: firstName, lastName: lastName, password: hashedPassword })];
                        case 4:
                            user = _a.sent();
                            return [4 /*yield*/, this.authService.generateToken(user)];
                        case 5:
                            access_token = _a.sent();
                            console.log('Registration successful for email:', email);
                            return [2 /*return*/, { user: user, access_token: access_token }];
                        case 6:
                            error_1 = _a.sent();
                            console.error('Registration error:', error_1.message || error_1);
                            throw new common_1.HttpException(error_1.message || 'Registration failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.login = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, user, access_token, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Received login request:', body);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            email = body.email, password = body.password;
                            if (!email || !password) {
                                console.log('Missing email or password');
                                throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.authService.validateUser(email, password)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                console.log('Invalid credentials for email:', email);
                                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.authService.generateToken(user)];
                        case 3:
                            access_token = _a.sent();
                            console.log('Login successful for email:', email);
                            return [2 /*return*/, { user: user, access_token: access_token }];
                        case 4:
                            error_2 = _a.sent();
                            console.error('Login error:', error_2.message || error_2);
                            throw new common_1.HttpException(error_2.message || 'Login failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.forgotPassword = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var email, user, token, resetLink, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Received forgot-password request:', body);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            email = body.email;
                            if (!email) {
                                console.log('Missing email');
                                throw new common_1.HttpException('Email is required', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.authService.findByEmail(email)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                console.log('User not found:', email);
                                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.authService.createResetToken(user)];
                        case 3:
                            token = _a.sent();
                            resetLink = "http://localhost:54693/reset-password/".concat(token);
                            console.log("Reset link for ".concat(email, ": ").concat(resetLink));
                            return [2 /*return*/, { message: 'Password reset email sent' }];
                        case 4:
                            error_3 = _a.sent();
                            console.error('Forgot password error:', error_3.message || error_3);
                            throw new common_1.HttpException(error_3.message || 'Failed to send reset email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.resetPassword = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var token, newPassword, user, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Received reset-password request:', body);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            token = body.token, newPassword = body.newPassword;
                            if (!token || !newPassword) {
                                console.log('Missing token or new password');
                                throw new common_1.HttpException('Token and new password are required', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.authService.updatePasswordWithToken(token, newPassword)];
                        case 2:
                            user = _a.sent();
                            console.log('Password reset successful for user:', user.email);
                            return [2 /*return*/, { message: 'Password reset successful' }];
                        case 3:
                            error_4 = _a.sent();
                            console.error('Reset password error:', error_4.message || error_4);
                            throw new common_1.HttpException(error_4.message || 'Failed to reset password', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _register_decorators = [(0, common_1.Post)('register')];
        _login_decorators = [(0, common_1.Post)('login')];
        _forgotPassword_decorators = [(0, common_1.Post)('forgot-password')];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password')];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
