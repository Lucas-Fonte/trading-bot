import {
  Column, Entity,
} from 'typeorm';
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

  // @Column()
  // symbol: string;

  // @Column()
  // currentPrice: string;

  // @Column()
  // value: string;

  // @Column()
  // percentage: string;

  // @Column()
  // timestamp: string;
}
