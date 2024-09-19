"use server";

import { Item } from "@/components/card";

export async function getItemById(id: number): Promise<Item> {
  const res = await fetch("http://localhost:8080/products/" + id);
  const data = await res.json();

  if (!res.ok) throw data;

  return data.data.item;
}
