"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(res, username, password, email, name, age, profilePic) {
        try {
            const user = await this.authService.register(username, password, email, name, age, profilePic);
            res.status(201).json({ user });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async login(res, username, password) {
        try {
            const user = await this.authService.login(username, password);
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
    async recoverPassword(res, email) {
        try {
            const { message, token } = await this.authService.recoverPassword(email);
            res.status(200).json({ message, token });
            // In production, send token via email
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async resetPassword(res, token, newPassword) {
        try {
            const user = await this.authService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password reset successful', user });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.Body)('email')),
    __param(4, (0, common_1.Body)('name')),
    __param(5, (0, common_1.Body)('age')),
    __param(6, (0, common_1.Body)('profilePic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('recover'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recoverPassword", null);
__decorate([
    (0, common_1.Put)('reset'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('token')),
    __param(2, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
