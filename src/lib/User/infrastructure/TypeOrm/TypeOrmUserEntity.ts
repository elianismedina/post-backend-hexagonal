import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class TypeOrmUserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;
}
