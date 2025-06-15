import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  serviceType: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  serviceType,
  className = '',
}: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-6xl mx-auto p-6 ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">{price}</span>
            <span className="text-gray-600">{duration}</span>
          </div>
          <div className="mt-3">
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
              {serviceType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}