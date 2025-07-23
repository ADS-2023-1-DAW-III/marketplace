import { CalendarX2 } from "lucide-react";

export function ServicoEmptyState({ message }: { readonly message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[50%]">
      <CalendarX2 className="h-28 w-28 text-gray-400" aria-hidden="true" />
      <p className="mt-4 text-lg text-gray-500">
        {message || "Nenhum serviço encontrado."}
      </p>
    </div>
  );
}
