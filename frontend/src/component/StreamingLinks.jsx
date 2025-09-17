import { useState } from "react";

const StreamingLinks = ({ movie }) => {
  const [showLinks, setShowLinks] = useState(false);

  // Mock streaming platforms - in a real app, this would come from an API
  const streamingPlatforms = [
    {
      name: "Netflix",
      url: `https://www.netflix.com/search?q=${encodeURIComponent(movie?.name)}`,
      icon: "🎬",
      available: true,
    },
    {
      name: "Amazon Prime Video",
      url: `https://www.primevideo.com/search/ref=atv_sr?phrase=${encodeURIComponent(movie?.name)}`,
      icon: "📺",
      available: true,
    },
    {
      name: "Disney+",
      url: `https://www.disneyplus.com/search?q=${encodeURIComponent(movie?.name)}`,
      icon: "🏰",
      available: true,
    },
    {
      name: "HBO Max",
      url: `https://play.max.com/search?q=${encodeURIComponent(movie?.name)}`,
      icon: "🎭",
      available: true,
    },
    {
      name: "Hulu",
      url: `https://www.hulu.com/search?q=${encodeURIComponent(movie?.name)}`,
      icon: "📱",
      available: true,
    },
    {
      name: "Apple TV+",
      url: `https://tv.apple.com/search?term=${encodeURIComponent(movie?.name)}`,
      icon: "🍎",
      available: true,
    },
    {
      name: "YouTube Movies",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie?.name + " movie")}`,
      icon: "📹",
      available: true,
    },
    {
      name: "Google Play Movies",
      url: `https://play.google.com/store/search?q=${encodeURIComponent(movie?.name + " movie")}&c=movies`,
      icon: "🎮",
      available: true,
    },
  ];

  const handlePlatformClick = (platform) => {
    window.open(platform.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Where to Watch</h3>
        <button
          onClick={() => setShowLinks(!showLinks)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          {showLinks ? "Hide Links" : "Show Streaming Options"}
        </button>
      </div>

      {showLinks && (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm mb-4">
            Click on any platform to search for "{movie?.name}" on their service:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {streamingPlatforms.map((platform, index) => (
              <button
                key={index}
                onClick={() => handlePlatformClick(platform)}
                className="flex flex-col items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300 group"
              >
                <span className="text-2xl mb-2">{platform.icon}</span>
                <span className="text-sm font-medium text-white group-hover:text-teal-400">
                  {platform.name}
                </span>
                <span className="text-xs text-green-400 mt-1">Available</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-300 mb-2">
              💡 Pro Tip
            </h4>
            <p className="text-sm text-blue-200">
              Availability may vary by region. Some platforms may require a subscription. 
              Check your local streaming services for the most accurate availability.
            </p>
          </div>

          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <h4 className="text-lg font-semibold text-yellow-300 mb-2">
              ⚖️ Legal Notice
            </h4>
            <p className="text-sm text-yellow-200">
              These links direct you to official streaming platforms. Always use legal 
              streaming services to support content creators and avoid piracy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingLinks;
