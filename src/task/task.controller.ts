import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put,  UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  @HttpCode(200)
  async getAllTasks(){
    try {
      const tasks = await this.taskService.getAll() 
      return {result:{
          status: 'success',
          code: 200,
          tasks: tasks
      }} 
    } catch (error) {
      console.log(error)
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOneTask(@Param('id') id:string){
    try {
      const task = await this.taskService.getOne(id) 
      return {result:{
          status: 'success',
          code: 200,
          tasks: task
      }} 
    } catch (error) {
      console.log(error)
    }
  }

  @Get('status/:status')
  @HttpCode(HttpStatus.OK)
  async getStatusTask(@Param('status') status: string ) {
    try {
      const tasks = await this.taskService.filterTask(status) 
      return {result:{
          status: 'success',
          code: 200,
          tasks: tasks
      }} 
    } catch (error) {
      console.log(error)
    }
  }


  @Post('')
  @UsePipes(new ValidationPipe())
  async createTask(@Body() dto: TaskDto){
    return await this.taskService.create(dto)
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateStatus(@Param('id') id: string, @Body() newTask: TaskDto){
    try {
      const updateTask = await this.taskService.update(id,newTask) 
      return {result:{
          status: 'success',
          code: 200,
          data: updateTask
      }} 
    } catch (error) {
      console.log(error)
    }
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async deleteTask(@Param('id') id: string){
    return await this.taskService.delete(id)
  }
}
