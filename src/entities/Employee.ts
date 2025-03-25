import { Entity, PrimaryGeneratedColumn, Column,BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import { IsEmail } from 'class-validator';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'employee' }) // Default role
    role: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
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