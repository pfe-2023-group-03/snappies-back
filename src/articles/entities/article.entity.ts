import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    label: string;

}
