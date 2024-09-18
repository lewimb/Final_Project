"use server";

import type { Item } from "@/components/card";

export async function getItems(): Promise<Item[]> {
  const res = await fetch("http://localhost:8080/products");
  const data = await res.json();

  if (!res.ok) throw data;

  return data.data.items;
}
