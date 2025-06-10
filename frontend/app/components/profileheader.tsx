import React from 'react';

interface ProfileHeaderProps {
  name: string;
  location: string;
}

export default function ProfileHeader({ name, location }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-start mb-6">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-2"></div>
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{location}</p>
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-sm mt-2 text-sm">
        Editar Perfil
      </button>
    </div>
  );
}