"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/productos?q=${encodeURIComponent(search)}`);
  }

  return (
    <form
      onSubmit={submit}
      className="flex-1 max-w-2xl"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full border rounded-xl px-5 py-3"
      />
    </form>
  );
}
