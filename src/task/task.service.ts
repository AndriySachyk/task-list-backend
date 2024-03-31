import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {


    constructor (private prisma: PrismaService ) {}


    async getById(id: string){
        const task  = this.prisma.todo_list.findUnique({
            where: {
                id: id.toString(),
            },
        })
    
        if (!task) throw new NotFoundException("Task not found!")

        return task
    }
    
// Показує весь список todo-list
    async getAll(){
      return  await this.prisma.todo_list.findMany()
    }



// Створює новий task 
    async create(dto: TaskDto){
        const newTask = await this.prisma.todo_list.create({
            data: dto
        })
        return newTask
    }

    async getOne(id:string){
        const tasks = await this.getAll()
        const task = tasks.find(task => task.id === id);
        return task
    }



// Оновлює статус task 
async update(id: string, newData: Partial<TaskDto>): Promise<TaskDto | null> {
    try {
        const task = await this.prisma.todo_list.findUnique({
            where: {
                id: id
            }
        });
        if (!task) {
            return null;
        }
        const updatedTask = await this.prisma.todo_list.update({
            where: {
                id: id
            },
            data: newData
        });
        return updatedTask;
    } catch (error) {
        console.error("Помилка при оновленні задачі:", error);
        throw error; // Якщо ви хочете перенаправити помилку на вищий рівень
    }
}



    async delete(id: string){
        const task = await this.getById(id)

         await this.prisma.todo_list.delete({
            where:{
                id: task.id,
            }
        })    
    }
    
    
    
    async filterTask(status:string){
       const tasks = await this.getAll()
       if (status !== "All") {
        const filterTaskStatus = tasks.filter((task)=>{ return task.status === status})
        return filterTaskStatus
       }
       return tasks
    }
}

