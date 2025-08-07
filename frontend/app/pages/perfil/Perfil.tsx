import { User, Edit } from "lucide-react";
import AccountInformation from "~/components/ui/CardInformacaoConta";
import { useContext, useEffect, useState } from "react";
import type { Pessoa } from "~/types/Pessoa";
import { useApi } from "~/hooks/services/api";
import { AuthContext } from "~/hooks/context/authContext";

interface ProfileHeaderProps {
  readonly name?: string;
}

function ProfileHeader({ name }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#307B8E] to-[#4A9BAE] flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            {name}
          </h2>

          <button className="inline-flex items-center gap-2 bg-[#307B8E] hover:bg-[#265D6B] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            <Edit className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const [pessoa, setPessoa] = useState<Pessoa>();
  const api = useApi();
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const response = async () => {
      try {
        const response = await api.get(`/pessoas/username/${username}`);
        setPessoa(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da pessoa:", error);
      }
    };
    response();
  }, [username]);

  return (
    <div className="h-full bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="bg-white rounded p-6 lg:col-span-3 relative">
          <ProfileHeader name={pessoa?.nome} />

          <AccountInformation email={pessoa?.email} phone={pessoa?.contato} />

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Habilidades
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-300 rounded-sm inline-flex px-4 py-2 max-w-full w-fit">
                <span className="font-plusjakartasans font-medium text-[14px] leading-[21px] text-center text-black">
                  {pessoa?.habilidades || "Nenhuma habilidade cadastrada"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
