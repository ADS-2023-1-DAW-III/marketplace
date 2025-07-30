import { type MetaArgs } from "react-router";

export function meta(_args: MetaArgs) {
  return [
    { title: "Editar Perfil" },
    {
      name: "Marketplace",
      content: "Edite as informações do seu perfil no Marketplace",
    },
  ];
}

const EditarPerfil = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
      <p>Este é o componente de edição de perfil.</p>
      {/* formulário de edição */}
    </div>
  );
};

export default EditarPerfil;