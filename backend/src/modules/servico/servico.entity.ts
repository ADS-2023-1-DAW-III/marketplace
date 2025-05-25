import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';

@Entity('servico')
export class Servico {
    @PrimaryColumn({ type: 'varchar', length: 50})
    id: string

    @Column({nullable: false})
    caminhoImagem: string

    @Column({ type: 'varchar', length: 100})
    titulo: string

    @Column({ default: false})
    eh_negociavel: boolean

    @Column({ type: 'varchar', length: 255})
    descricao: string

    @Column({ type: 'decimal', precision: 10, scale: 2})
    preco: number

    @ManyToOne(() => Pessoa, (pessoa) => pessoa.username)
    pessoa: Pessoa
}
