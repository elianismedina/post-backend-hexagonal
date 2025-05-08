import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class TypeOrmUserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
