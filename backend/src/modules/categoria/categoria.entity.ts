import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Servico } from '../servico/servico.entity';

@Entity('categorias')
export class Categoria {
    @PrimaryColumn()
    nome: string;

    @Column({ type: 'text', nullable: true })
    descricao: string;

    /*@ManyToMany(() => Servico, servico => servico.categorias)
    servicos: Servico[];
    */
}
