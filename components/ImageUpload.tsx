"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    try {
      setUploading(true);

      const extension = file.name.split(".").pop();

      const fileName =
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2) +
        "." +
        extension;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      onChange(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl h-64 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50"
      >
        {value ? (
          <img
            src={value}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">
            {uploading ? "Subiendo..." : "Seleccionar imagen"}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          upload(e.target.files[0]);
        }}
      />

    </div>
  );
}
