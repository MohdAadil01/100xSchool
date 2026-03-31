import axios from "axios";
import { useEffect, useState } from "react";

function Upload() {
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [presignedUrl, setPresignedUrl] = useState({
    video: "",
    thumbnail: "",
  });

  useEffect(() => {
    const getPresignedUrl = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/video/upload/getPresignedUrl`,
          {},
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TEMP_TOKEN}`,
            },
          },
        );
        setPresignedUrl({
          video: response.data.data.putUrlVideo,
          thumbnail: response.data.data.putUrlThumbnail,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getPresignedUrl();
  }, []);

  const upload = async () => {
    if (!presignedUrl.video || !presignedUrl.thumbnail) {
      console.log("Presigned URL not ready yet ❌");
      return;
    }

    if (!video || !thumbnail) {
      console.log("Files not selected ❌");
      return;
    }

    try {
      const responseVideo = await axios.put(presignedUrl.video, video, {
        headers: {
          "Content-Type": "video/mp4",
        },
      });
      const responseThumbnail = await axios.put(
        presignedUrl.thumbnail,
        thumbnail,
        {
          headers: {
            "Content-Type": "image/jpeg",
          },
        },
      );
      console.log(responseVideo);
      console.log(responseThumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Video</h1>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Upload Video</label>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white hover:file:bg-blue-700
              cursor-pointer"
          />

          {video && (
            <p className="mt-2 text-xs text-gray-400">Selected: {video.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">
            Upload Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-green-600 file:text-white hover:file:bg-green-700
              cursor-pointer"
          />

          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="preview"
              className="mt-3 w-full h-40 object-cover rounded-md"
            />
          )}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 rounded-lg font-semibold"
          onClick={upload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default Upload;
