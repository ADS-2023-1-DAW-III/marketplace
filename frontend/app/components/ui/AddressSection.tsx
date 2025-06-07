import React from "react";
import { HomeIcon, GlobeIcon, PlusIcon } from "~/components/ui/Icons";

export default function AddressSection() {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Endereços</h3>

      <div className="mb-2 flex items-start gap-2">
        <HomeIcon className="text-blue-600 w-5 h-5 mt-1" />
        <div>
          <p>Rua Floriano Peixoto, 426</p>
          <p className="text-sm text-gray-500">Maria Eduarda</p>
        </div>
      </div>

      <div className="mb-2 flex items-start gap-2">
        <GlobeIcon className="text-green-600 w-5 h-5 mt-1" />
        <div>
          <p>Brasil</p>
          <p className="text-sm text-gray-500">Paraíba, 58135-000</p>
        </div>
      </div>
      <div className="mb-2 flex justify-between items-center  gap-2">
       <a href="#" className="text-blue-600 text-sm">Adicionar outro endereço</a>
       <PlusIcon className="text-blue-600 w-5 h-5 mt-1"/>
      </div>
      

    </div>
  );
}
