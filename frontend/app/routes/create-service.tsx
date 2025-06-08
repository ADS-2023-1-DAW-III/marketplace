import ServiceForm from "~/components/service-form";

export function meta({}) {
  return [
    { title: "Criar serviço - Marketplace" },
    { name: "description", content: "Formulário para criar um novo serviço" },
  ];
}

export default function CreateService() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* TODO: add header */}
      {/* TODO: add sidebar */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
        Agora, compartilhe algumas informações sobre seu serviço
      </h1>

      <div className="lg:flex lg:gap-x-16">
        <div className="lg:w-1/2">
          <ServiceForm />
        </div>
      </div>
    </main>
  );
}