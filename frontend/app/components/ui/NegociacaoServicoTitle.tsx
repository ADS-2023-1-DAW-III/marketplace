import React from "react";

interface NegociacaoServicoTitleProps {
  title: string;
}

export default function NegociacaoServicoTitle({ title }: NegociacaoServicoTitleProps) {
  return (
    <div className="bg-[#2D7B8B] text-white text-center text-lg font-semibold py-3 px-6 rounded-full w-full m-4">
      {title}
    </div>
  );
}
