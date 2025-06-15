import React from "react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-[#307B8E] text-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4">
        <h2 className="font-poppins font-semibold text-3xl text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

