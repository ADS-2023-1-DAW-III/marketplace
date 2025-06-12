import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pagamento')
export class Pagamento {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column()
  id_abacate: string;

  @Column()
  data: Date;

  @Column({ default: false })
  status: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}
