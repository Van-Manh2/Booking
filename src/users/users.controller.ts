import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Tạo User mới
  @Post()
  async createUser(@Body() body: { _id: string; name: string; phone: string; address: string }) {
    return this.usersService.createUser(body);
  }

  // Lấy danh sách tất cả Users
  @Get()
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  // Lấy User theo _id
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // Cập nhật thông tin User
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<{ name: string; phone: string; address: string }>) {
    return this.usersService.updateUser(id, body);
  }

  // Xóa User theo _id
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
