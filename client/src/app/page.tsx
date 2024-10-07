"use client";
import { LinkCard } from "@/components/modules/home/link-card";
import { LinkInput } from "@/components/modules/home/link-input";
import { createLink, deleteLink, listLinks } from "@/services/api";
import { ILink } from "@/store/link/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState<ILink[]>([]);

  async function handleListLinks() {
    try {
      const data = await listLinks();
      setLinks(data as ILink[]);
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleAddLink(url: string, name: string) {
    try {
      const data = await createLink({
        name,
        url,
      });
      await handleListLinks();
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleDeleteLink(id: number) {
    try {
      await deleteLink(id);
      await handleListLinks();
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    handleListLinks();
  }, []);

  return (
    <main className="min-h-vh flex w-full flex-col items-center gap-4">
      <header className="flex h-full w-full flex-col items-center bg-red-500 p-10 text-white">
        <h1 className="text-2xl font-bold ">Youtube Link Saver</h1>
        <p className="italic">Save your youtube links here</p>
      </header>
      <LinkInput onSave={handleAddLink} />
      <section className="flex max-w-2xl flex-wrap justify-center gap-4 mt-5">
        {links.map((l) => (
          <LinkCard
            key={l.id}
            name={l.name}
            url={l.url}
            id={l.id}
            onDelete={handleDeleteLink}
          />
        ))}
      </section>
    </main>
  );
}
