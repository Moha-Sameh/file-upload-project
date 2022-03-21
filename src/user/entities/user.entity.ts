import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import LocalFile from '../../local-files/entities/local-file.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @JoinColumn({ name: 'avatarId' })
  @OneToMany<LocalFile>(() => LocalFile, (localfile) => localfile.id)
  public avatar?: LocalFile[];

  @Column({ type: 'json', name: 'avatarId' })
  public avatarId?: LocalFile[];
}

export default User;
