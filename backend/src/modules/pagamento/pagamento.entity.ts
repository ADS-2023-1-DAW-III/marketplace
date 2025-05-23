import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pagamento')
export class Pagamento {
    @PrimaryColumn({ type: 'number'})
    id: number

    @Column()
    id_abacte: string

    @Column()
    data: Date

    @Column({ default: false})
    status: boolean

    @Column({ type: 'decimal', precision: 10, scale: 2})
    valor: number

}
