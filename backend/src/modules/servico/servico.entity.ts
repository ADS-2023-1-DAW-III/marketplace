import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, ManyToMany, Generated, JoinColumn } from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Historico } from '../historico/historico.entity';
import { Categoria } from '../categoria/categoria.entity';
import { Negociacao } from '../negociacao/negociacao.entity';

@Entity('servico')
export class Servico {
    @PrimaryColumn({ type: 'uuid'})
    @Generated('uuid')
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

    @Column({type: 'int'})
    duracao: number

    @ManyToOne(() => Pessoa, (pessoa) => pessoa.username)
    pessoa: Pessoa

    @OneToMany(() => Historico, (historico) => historico.pessoa)
    historico: Historico[];
    
    @ManyToMany(() => Categoria, (categoria) => categoria.servicos)
    categorias: Categoria[];

    @OneToMany(() => Negociacao, (negociacao) => negociacao.servico)
    negociacoes: Negociacao[];
}
