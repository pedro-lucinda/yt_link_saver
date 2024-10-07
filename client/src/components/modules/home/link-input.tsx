"use client";

import { useState } from "react";
import { Button } from "@/components/templates/ui/button";
import { Input } from "@/components/templates/ui/input";

type Props = {
  onSave: (url: string, name: string) => Promise<void>;
};

export function LinkInput({ onSave }: Props) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  async function handleSave() {
    if (!url || !name) return;
    await onSave(url, name);
    setUrl("");
    setName("");
  }

  return (
    <div className="flex w-full flex-col gap-2 px-5 lg:max-w-2xl">
      <Input
        type="url"
        placeholder="Enter youtube link here"
        className="w-full flex-1 p-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter name here"
          className="w-full flex-1 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          className=" bg-blue-500 p-2 text-white"
          onClick={handleSave}
          disabled={!url || !name}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
