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
// import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
// import bcrypt from 'bcryptjs';

// @Entity()
// export class Employee {
//     @PrimaryGeneratedColumn("increment")
//     id: number;

//     @Column()
//     firstName: string;

//     @Column()
//     lastName: string;

//     @Column({ unique: true }) // Ensure unique emails
//     email: string;

//     @Column()
//     password: string;
    
//     @BeforeInsert()
//     async hashPassword() {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
// }