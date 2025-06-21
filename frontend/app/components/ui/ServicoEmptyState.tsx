import { CalendarX2 } from "lucide-react";

export function ServicoEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 md:mt-24">
      <CalendarX2 className="h-28 w-28 text-gray-400" aria-hidden="true" />
      <p className="mt-4 text-lg text-gray-500">
        Nenhum serviço contratado até o momento.
      </p>
    </div>
  );
}
