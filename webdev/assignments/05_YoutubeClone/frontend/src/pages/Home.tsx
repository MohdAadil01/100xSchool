import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  channelName: string;
  profilePicture: string;
};

type Video = {
  id: string;
  videoUrl: string;
  thumbnail: string;
  user: User;
  createdAt: string;
};

function Home() {
  const [recommendations, setRecommendations] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/videos`,
        );

        if (response.status === 200) {
          setRecommendations(response.data?.data || []);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Error while calling API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold bg-gray-900">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Recommended Videos</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recommendations.map((video) => (
          <div
            key={video.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className="w-full h-44 object-cover"
              />

              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-xs rounded">
                0:30
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-start gap-3">
                <img
                  src={video.user?.profilePicture}
                  alt="channel"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-semibold line-clamp-2">
                    Video #{video.id.slice(0, 8)}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {video.user?.channelName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
