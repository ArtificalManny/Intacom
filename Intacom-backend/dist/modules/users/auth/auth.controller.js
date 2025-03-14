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
    async register(res, firstName, lastName, username, password, email, gender, birthday, profilePic) {
        console.log('Received registration data:', { firstName, lastName, username, password, email, gender, birthday, profilePic });
        try {
            const user = await this.authService.register(firstName, lastName, username, password, email, gender, birthday, profilePic);
            res.status(201).json({ message: 'Registration successful. Check your email for confirmation.', user });
        }
        catch (error) {
            console.error('Registration error:', error.message, error.stack);
            res.status(400).json({ error: error.message });
        }
    }
    async login(res, identifier, password) {
        console.log('Received login data:', { identifier, password });
        try {
            const user = await this.authService.login(identifier, password);
            res.status(200).json({ user });
        }
        catch (error) {
            console.error('Login error:', error.message, error.stack);
            res.status(401).json({ error: error.message });
        }
    }
    async recoverPassword(res, email) {
        console.log('Received recover password request:', { email });
        try {
            const { message, token } = await this.authService.recoverPassword(email);
            res.status(200).json({ message, token });
        }
        catch (error) {
            console.error('Recover password error:', error.message, error.stack);
            res.status(400).json({ error: error.message });
        }
    }
    async resetPassword(res, token, newPassword) {
        console.log('Received reset password request:', { token, newPassword });
        try {
            const user = await this.authService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password reset successful', user });
        }
        catch (error) {
            console.error('Reset password error:', error.message, error.stack);
            res.status(400).json({ error: error.message });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('firstName')),
    __param(2, (0, common_1.Body)('lastName')),
    __param(3, (0, common_1.Body)('username')),
    __param(4, (0, common_1.Body)('password')),
    __param(5, (0, common_1.Body)('email')),
    __param(6, (0, common_1.Body)('gender')),
    __param(7, (0, common_1.Body)('birthday')),
    __param(8, (0, common_1.Body)('profilePic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('identifier')),
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
//# sourceMappingURL=auth.controller.js.map