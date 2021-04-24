import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Car {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public notes: string;

    @Column()
    public other: string;

}

export default Car;