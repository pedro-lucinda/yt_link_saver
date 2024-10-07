import { YouTubeEmbed } from "./youtube-embed";
import { Button } from "@/components/templates/ui/button";

type Props = {
  name: string;
  url: string;
  id: number;

  onDelete(id: number): Promise<void>;
};

export function LinkCard({ id, name, url, onDelete }: Props) {
  return (
    <div className="h-50 flex w-80 flex-col gap-2 overflow-clip rounded-lg border-2 p-2 ease-in-out  hover:scale-105">
      <YouTubeEmbed videoUrl={url} />
      <div className="flex items-center gap-2">
        <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {name}
        </p>
        <Button
          className=" h-6 w-6 bg-red-500 p-2 align-middle text-xs text-white"
          onClick={() => onDelete(id)}
        >
          X
        </Button>
      </div>
    </div>
  );
}
