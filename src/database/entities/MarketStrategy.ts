import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MarketStrategy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  strategy: string;

  @Column({ type: 'float' })
  positiveFactor: number;

  @Column({ type: 'float' })
  negativeFactor: number;
}
