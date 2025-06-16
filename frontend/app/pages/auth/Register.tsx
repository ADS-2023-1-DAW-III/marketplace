import type { MetaArgs } from "react-router";

export function meta(_args: MetaArgs) {
  return [
    { title: "Cadastro" },
    {
      name: "Marketplace",
      content: "Bem vindo a tela de cadastro do Marketplace",
    },
  ];
}

const Register = () => {
  return (
    <div>
      <p>Tela de Cadastro</p>
    </div>
  );
};

export default Register;
