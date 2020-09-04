import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MarketWatcher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  watcher: string;

  @Column()
  active: boolean;
}
