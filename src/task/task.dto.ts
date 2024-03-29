import { IsInt, IsString } from "class-validator";


export class TaskDto {

    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    status: string;


}