import { Delivery } from "src/deliveries/entities/delivery.entity";
import { Role } from "src/enums/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstname: string;

    @Column({ nullable: false })
    lastname: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: Role.User })
    role: Role;

    @OneToMany(() => Delivery, delivery => delivery.userId)
    deliveries: Delivery[];
}
