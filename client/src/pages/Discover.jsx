import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";

const Discover = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [retweetedPosts, setRetweetedPosts] = useState(new Set());
  const [tweetText, setTweetText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // First, try to get from localStorage
        const savedPosts = localStorage.getItem('stellafi-posts');
        
        if (savedPosts) {
          // If we have saved posts, use them
          setPosts(JSON.parse(savedPosts));
        } else {
          // Otherwise, fetch from feed.json
          const response = await fetch('/feed.json');
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const data = await response.json();
          setPosts(data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!tweetText.trim()) return;

    try {
      const newPost = {
        id: Date.now(), // Simple ID generation
        user: {
          name: "You",
          handle: "@you",
          avatar: "/stellafi.png",
          verified: false,
        },
        time: "now",
        content: tweetText.trim(),
        likes: 0,
        replies: 0,
        retweets: 0,
        trending: false,
      };

      // Add to the beginning of posts array
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);

      // Save to feed.json via API call to server
      await saveFeedData(updatedPosts);

      // Clear the tweet text
      setTweetText("");
    } catch (err) {
      console.error('Error posting tweet:', err);
      setError('Failed to post tweet');
    }
  };

  const saveFeedData = async (postsData) => {
    // Always save to localStorage immediately for instant updates
    localStorage.setItem('stellafi-posts', JSON.stringify(postsData));
    
    try {
      const response = await fetch('http://localhost:3001/api/save-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postsData),
      });

      if (!response.ok) {
        console.warn('Failed to save to server, but saved locally');
      }
    } catch (err) {
      console.warn('Server not available, saved to localStorage only:', err);
    }
  };

  const handleLike = async (postId) => {
    const isCurrentlyLiked = likedPosts.has(postId);
    
    // Update UI state
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    // Update post data
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    await saveFeedData(updatedPosts);
  };

  const handleRetweet = async (postId) => {
    const isCurrentlyRetweeted = retweetedPosts.has(postId);
    
    // Update UI state
    setRetweetedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    // Update post data
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          retweets: isCurrentlyRetweeted ? post.retweets - 1 : post.retweets + 1
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    await saveFeedData(updatedPosts);
  };

  const PostCard = ({ post }) => {
    const isLiked = likedPosts.has(post.id);
    const isRetweeted = retweetedPosts.has(post.id);

    return (
      <article
        className="p-6 transition-all duration-300 group cursor-pointer rounded-3xl mx-4 my-2 shadow-lg hover:shadow-xl"
        style={{ backgroundColor: "#181A1E" }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1F2226")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#181A1E")}
      >
        {post.trending && (
          <div className="flex items-center mb-4 text-twitter-subtle text-sm ml-16">
            <svg
              className="w-4 h-4 mr-2 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Trending in Crypto</span>
          </div>
        )}

        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="relative group/avatar">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-14 h-14 rounded-2xl transition-all duration-300 shadow-lg"
              />
              {post.user.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-twitter-blue to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-bold text-twitter-white hover:underline cursor-pointer truncate text-base">
                {post.user.name}
              </span>
              <span className="text-twitter-muted truncate text-base">
                {post.user.handle}
              </span>
              <span className="text-twitter-subtle">·</span>
              <span className="text-twitter-muted hover:underline cursor-pointer flex-shrink-0 text-base">
                {post.time}
              </span>
              {post.hasThread && (
                <div className="px-2 py-0.5 bg-twitter-blue/20 text-twitter-blue text-xs rounded-full font-medium">
                  Thread
                </div>
              )}
              {post.nft && (
                <div className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">
                  NFT
                </div>
              )}
            </div>

            <div className="text-twitter-white mb-4 leading-relaxed whitespace-pre-wrap text-base">
              {post.content}
            </div>

            {post.image && (
              <div className="mb-4 rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full max-h-96 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            )}

            <div className="flex items-center justify-between max-w-md mt-4">
              <button className="flex items-center space-x-2 text-twitter-muted hover:text-twitter-blue transition-colors duration-200 group/btn">
                <div className="p-3 rounded-2xl group-hover/btn:bg-twitter-blue/10 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">{post.replies}</span>
              </button>

              <button
                onClick={() => handleRetweet(post.id)}
                className={`flex items-center space-x-2 transition-colors duration-200 group/btn ${
                  isRetweeted
                    ? "text-green-400"
                    : "text-twitter-muted hover:text-green-400"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl transition-colors duration-200 ${
                    isRetweeted
                      ? "bg-green-400/20"
                      : "group-hover/btn:bg-green-400/10"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isRetweeted ? "scale-110" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  {post.retweets}
                </span>
              </button>

              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-colors duration-200 group/btn ${
                  isLiked
                    ? "text-red-500"
                    : "text-twitter-muted hover:text-red-500"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl transition-colors duration-200 ${
                    isLiked ? "bg-red-500/20" : "group-hover/btn:bg-red-500/10"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isLiked ? "scale-110" : ""
                    }`}
                    fill={isLiked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  {post.likes}
                </span>
              </button>

              <button className="p-3 rounded-2xl text-twitter-muted hover:text-twitter-blue hover:bg-twitter-blue/10 transition-colors duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="w-full min-h-screen bg-transparent">
      {/* TopBar */}
      <TopBar />

      <div className="mx-4 mt-4 overflow-hidden bg-transparent">
        {/* Header with Sticky Navigation */}
        {/* <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 modern-separator">
          <div className="flex">
            {['discover', 'videos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-5 text-center font-semibold transition-all duration-300 relative rounded-t-3xl ${
                  activeTab === tab
                    ? 'text-twitter-white bg-twitter-disabled/10'
                    : 'text-twitter-subtle hover:text-twitter-white hover:bg-twitter-disabled/5'
                }`}
              >
                <span className="capitalize text-lg font-semibold">{tab}</span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-twitter-blue to-purple-500 rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>
        </div> */}

        {/* Tweet Composition */}
        <div className="m-4 p-6 bg-transparent">
          <div className="flex space-x-2 bg-[#181A1E] p-2 rounded-2xl">
            <img
              src="/stellafi.png"
              alt="Your avatar"
              className="w-14 h-14 rounded-2xl shadow-lg flex-shrink-0 m-4"
            />
            <div className="flex-1 min-w-0 p-4">
              <textarea
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent text-lg text-twitter-white placeholder-twitter-muted resize-none focus:outline-none min-h-[80px] leading-relaxed text-body"
                maxLength={280}
              />

              {/* Tweet Actions */}
              <div className="flex items-center justify-between mt-6 gap-4">
                <div className="flex space-x-3 overflow-x-auto">
                  {[
                    {
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                      label: "Media",
                      color: "text-twitter-blue hover:bg-twitter-blue/10",
                    },
                    {
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      ),
                      label: "Poll",
                      color: "text-green-400 hover:bg-green-400/10",
                    },
                    {
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-5V5a3 3 0 116 0v5H9z"
                          />
                        </svg>
                      ),
                      label: "Emoji",
                      color: "text-yellow-400 hover:bg-yellow-400/10",
                    },
                    {
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                      label: "Schedule",
                      color: "text-purple-400 hover:bg-purple-400/10",
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`p-2.5 rounded-full transition-all duration-200 ${item.color} flex-shrink-0`}
                      title={item.label}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0">
                  {tweetText.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 relative ${
                          tweetText.length > 260
                            ? "border-red-500"
                            : tweetText.length > 240
                            ? "border-yellow-500"
                            : "border-twitter-blue"
                        }`}
                      >
                        <div
                          className={`absolute inset-0.5 rounded-full transition-all duration-200 ${
                            tweetText.length > 260
                              ? "bg-red-500"
                              : tweetText.length > 240
                              ? "bg-yellow-500"
                              : "bg-twitter-blue"
                          }`}
                          style={{
                            transform: `rotate(${
                              (tweetText.length / 280) * 360
                            }deg)`,
                            clipPath:
                              "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
                          }}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium hidden sm:inline ${
                          tweetText.length > 260
                            ? "text-red-500"
                            : tweetText.length > 240
                            ? "text-yellow-500"
                            : "text-twitter-subtle"
                        }`}
                      >
                        {280 - tweetText.length}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handlePostSubmit}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 text-base ${
                      tweetText.trim()
                        ? "bg-gradient-to-r from-twitter-blue to-purple-500 hover:from-twitter-darkBlue hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                        : "bg-twitter-blue/50 text-white/70 cursor-not-allowed"
                    }`}
                    disabled={!tweetText.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pb-20 bg-transparent">
          {activeTab === "discover" && (
            <div className="bg-transparent">
              {loading ? (
                <div className="p-16 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-32 h-32 bg-gradient-to-br from-twitter-blue via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                      <svg
                        className="w-16 h-16 text-white animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-twitter-white mb-4">
                      Loading feed... 📡
                    </h3>
                    <p className="text-twitter-muted text-lg leading-relaxed">
                      Getting the latest posts from the crypto community.
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="p-16 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-twitter-white mb-4">
                      Oops! Something went wrong 😅
                    </h3>
                    <p className="text-twitter-muted text-lg leading-relaxed mb-6">
                      {error}
                    </p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-gradient-to-r from-twitter-blue to-purple-500 hover:from-twitter-darkBlue hover:to-purple-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "videos" && (
            <div className="p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-twitter-blue via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-twitter-white mb-4">
                  Video content coming soon! 🎬
                </h3>
                <p className="text-twitter-muted text-lg leading-relaxed">
                  We're working on bringing you the best video content from the
                  crypto and Web3 community. Stay tuned for exciting updates!
                </p>
                <div className="mt-8">
                  <button className="px-6 py-3 bg-gradient-to-r from-twitter-blue to-purple-500 hover:from-twitter-darkBlue hover:to-purple-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Notified
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
