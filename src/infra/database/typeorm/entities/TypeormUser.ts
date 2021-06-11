import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class TypeormUser {
  @PrimaryColumn()
  _id: string;

  @Column({ unique: true })
  email: string;
}

export { TypeormUser };
