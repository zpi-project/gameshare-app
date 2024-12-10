import { FC, useState } from "react";
import { cn } from "@/utils/tailwind";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const VIDEOS = [
  {
    label: "Powitanie",
    url: "https://drive.google.com/file/d/1Y9CRt0HLN1ddUgsIaZhRX6ybtDOA6Mhr/preview",
  },
  {
    label: "Logowanie",
    url: "https://drive.google.com/file/d/1Y9CRt0HLN1ddUgsIaZhRX6ybtDOA6Mhr/preview",
  },
  {
    label: "Wyszukiwanie egzemplarza gry",
    url: "https://drive.google.com/file/d/1tHRbJNOe7jdBgABQyZaxkENVcORpuFrq/preview",
  },
  {
    label: "Dodanie egzemplarza gry",
    url: "https://drive.google.com/file/d/1ORKEct5dNAQ_GOfOWWnCxxY6pvH9xLsj/preview",
  },
  {
    label: "Rezerwacja gry",
    url: "https://drive.google.com/file/d/1jhhj67U13b-mjVUMkp-dz7OnGgZle9KQ/preview",
  },
  {
    label: "Zarządzanie rezerwacją",
    url: "https://drive.google.com/file/d/1X34pZ4fZoHW7s2Quc1Nz2ewFwlFOKiUq/preview",
  },
];

const VideoTutorial: FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="w-[220px] justify-start">
          Videotutorial
        </Button>
      </DialogTrigger>
      <DialogContent className="flex min-h-[60%] min-w-[70%] flex-col gap-2">
        <h2 className="mb-2 text-xl font-bold capitalize">GAMESHARE USER VIDEOTUTORIAL</h2>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            {VIDEOS.map((video, index) => (
              <Button
                key={index}
                onClick={() => {
                  setSelectedVideo(video);
                  setIsLoading(true);
                }}
                className={cn(
                  "h-max justify-start text-left",
                  selectedVideo.label === video.label && "bg-primary outline",
                )}
              >
                {video.label}
              </Button>
            ))}
          </div>
          <div className="relative h-full w-full">
            {isLoading && (
              <div className="absolute left-1/2 top-1/2 z-[1000] h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform">
                <div
                  className="h-full w-full animate-spin rounded-full border-4 border-foreground border-t-transparent duration-700"
                  role="status"
                  aria-label="loading"
                />
                <div
                  className="absolute left-[10px] top-[10px] h-7 w-7 animate-spin rounded-full border-4 border-transparent border-t-primary"
                  role="status"
                  aria-label="loading"
                />
              </div>
            )}
            <iframe
              src={selectedVideo.url}
              width="100%"
              height="630px"
              allow="autoplay"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoTutorial;
