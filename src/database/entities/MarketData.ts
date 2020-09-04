import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IMarketData {
  ask: number;
  bid: number;
  flags: number;
  last: number;
  symbol: string;
  time: string;
  time_msc: number;
  volume: number;
  volume_real: number;
}

@Entity()
export abstract class MarketData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  ask: number;

  @Column()
  bid: number;

  @Column()
  flags: number;

  @Column()
  last: number;

  @Column()
  time: string;

  @Column()
  time_msc: number;

  @Column()
  volume: number;

  @Column()
  volume_real: number;

  @Column()
  timestamp: string;
}
