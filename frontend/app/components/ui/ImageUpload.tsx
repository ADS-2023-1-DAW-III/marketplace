"use client"

import { Label } from "~/components/ui/label";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  previewImage: string | null;
  onRemove: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUpload({ previewImage, onRemove, onChange }: ImageUploadProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Label className="text-[#103A57] text-lg">Imagem:</Label>
      <div className="flex justify-center">
        {previewImage ? (
          <div className="relative group">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="h-32 w-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label 
            htmlFor="image-upload"
            className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <Upload className="h-6 w-6 text-gray-500 mb-2" />
            <span className="text-sm text-gray-500">Adicionar</span>
          </label>
        )}
      </div>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}