import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract class MarketData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    symbol: string;

    @Column()
    currentPrice: number;

    @Column()
    value: string;

    @Column()
    percentage: string;

    @Column()
    timestamp: string;
}
