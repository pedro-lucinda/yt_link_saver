type Props = {
  videoUrl: string;
};

export function YouTubeEmbed({ videoUrl }: Props) {
  // Function to extract the YouTube video ID from the URL
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div className="h-full w-full">
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
    </div>
  );
}
