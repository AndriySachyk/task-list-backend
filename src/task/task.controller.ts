import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(){
    return await this.taskService.getAll()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() dto: TaskDto){
    return await this.taskService.create(dto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateStatus(@Param('id') id: number, @Body() newStatus: string){
      return await this.taskService.update(id, newStatus)
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteTask(@Param('id') id: number){
    return await this.taskService.delete(id)
  }
}
