import { IsInt, IsString } from "class-validator";


export class TaskDto {

    @IsString()
    title: string


    @IsInt()
    id: number

    @IsString()
    status: string
    
    
    @IsString()
    description?: string



}