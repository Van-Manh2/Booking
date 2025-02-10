import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Tạo User với _id là string
  async createUser(userData: { _id: string; name: string; phone: string; address: string }): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  // Lấy danh sách Users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Lấy User theo _id (xử lý null)
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException(`User với ID ${userId} không tồn tại`);
    return user;
  }

  // Cập nhật User theo _id (xử lý null)
  async updateUser(userId: string, updateData: Partial<User>): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException(`Không thể cập nhật User có ID ${userId}`);
    return updatedUser;
  }

  // Xóa User theo _id (xử lý null)
  async deleteUser(userId: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) throw new NotFoundException(`Không thể xóa User có ID ${userId}`);
    return deletedUser;
  }
}
