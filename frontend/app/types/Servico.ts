export type Servico = {
  id: string;
  status: "Pendente" | "Em andamento" | "Concluído";
  tempo: string;
  titulo: string;
  descricao: string;
  nome: string;
  contato: string;
  valor: number;
  valorPago: number;
  data: Date;
  imagem: string;
  avatar: string;
};
