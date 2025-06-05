import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, Generated } from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';
import { Pagamento } from '../pagamento/pagamento.entity';

@Entity('negociacao')
export class Negociacao {
    @PrimaryColumn({ type: 'uuid'})
    @Generated('uuid')
    id: string

    @Column({ default: false})
    houve_negociacao: boolean

    @Column({ default: false})
    aceito: boolean

    @Column({ type: 'decimal', precision: 10, scale: 2})
    novo_valor: number

    @ManyToOne(() => Pessoa, (pessoa) => pessoa.username)
    pessoa: Pessoa

    @ManyToOne(() => Servico, (servico) => servico.id)
    @JoinColumn({ name: 'servico_id' })
    servico: Servico

    @OneToOne(() => Pagamento, (pagamento) => pagamento.negociacao)
    @JoinColumn({ name: 'pagamento_id' })
    pagamento: Pagamento;
}
