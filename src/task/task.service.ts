import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {


    constructor (private prisma: PrismaService ) {}


    async getById(id: number){
        const task  = this.prisma.todo_list.findUnique({
            where: {
                id: +id,
            },
        })
    
        if (!task) throw new NotFoundException("Task not found!")

        return task
    }
    
// Показує весь список todo-list
    getAll(){
      return  this.prisma.todo_list.findMany()
    }



// Створює новий task 
    async create(dto: TaskDto){
        const newTask = await this.prisma.todo_list.create({
            data: dto
        })
        return newTask
    }



// Оновлює статус task 
    async update(id:number, newStatus: string){
        const task = await this.getById(id)
        
        const updateStatus = newStatus["status"]

        console.log('updateStatus', updateStatus)

        this.prisma.todo_list.update({
            where:{
                id: task.id,
            },   
            data:{
                status: task.status = updateStatus
            }
        })
        console.log('task', task)
        return task
    }

    async delete(id: number){
        const task = await this.getById(id)

        const taskDelete = await this.prisma.todo_list.delete({
            where:{
                id: task.id,
            }
        })
    
    
    }

}
