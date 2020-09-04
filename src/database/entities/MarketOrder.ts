import { Column, Entity } from 'typeorm';
import { MarketData } from './MarketData';

@Entity()
export class MarketOrder extends MarketData {
  @Column()
  action: string;

  @Column()
  positiveGain: number;

  @Column()
  negativeGain: number;

  @Column()
  positiveLoss: number;

  @Column()
  negativeLoss: number;
}
