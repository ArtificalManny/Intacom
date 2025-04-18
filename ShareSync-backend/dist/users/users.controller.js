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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const common_2 = require("@nestjs/common");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findByUsername(username) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_2.HttpException('User not found', common_2.HttpStatus.NOT_FOUND);
        }
        return {
            status: 'success',
            data: user,
        };
    }
    async findById(id) {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new common_2.HttpException('User not found', common_2.HttpStatus.NOT_FOUND);
        }
        return {
            status: 'success',
            data: user,
        };
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.usersService.update(id, updateUserDto);
        return {
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('by-username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map