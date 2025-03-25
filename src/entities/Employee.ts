import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 50)
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'employee' }) // Default role
    role: string;
    firstName: any;
    lastName: any;
}