import { Status } from "@prisma/client"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString, Validate, ValidateNested } from "class-validator"
import { NoWhitespaceValidator } from "src/common/custom-validators"

export class TaskId {
    id: string
}

export class Task {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    status: Status

    userId: string
    
}

export class CreateTaskDto {

    @ValidateNested({ each: true })
    @Type(() => Task)
    task: Task

    @Type(() => TaskId)
    taskId: TaskId
}
