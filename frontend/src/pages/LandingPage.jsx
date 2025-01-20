import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader, Wand2, Users, Sparkles } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/post");
      const result = await response.json();

      if (result.success) {
        setPosts(result.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const features = [
    {
      icon: <Wand2 className="w-8 h-8 text-[#6469ff]" />,
      title: "AI-Powered Creation",
      description:
        "Transform your ideas into stunning visuals with our state-of-the-art AI image generation technology.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#6469ff]" />,
      title: "Community Driven",
      description:
        "Join a vibrant community of creators, share your generations, and get inspired by others' work.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#6469ff]" />,
      title: "Endless Possibilities",
      description:
        "Create anything from abstract art to realistic scenes with simple text prompts.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-[#222328] sm:text-6xl">
            Transform Your
            <span className="text-[#6469ff]"> Imagination </span>
            Into Reality
          </h1>
          <p className="mt-6 text-lg text-[#666e75] max-w-3xl mx-auto">
            Create stunning, unique images with the power of AI. Turn your ideas
            into artwork with just a few words. Join our creative community and
            start generating masterpieces today.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={() => navigate("/create-post")}
              className="px-6 py-3 bg-[#6469ff] text-white rounded-md font-medium flex items-center gap-2 hover:bg-[#5054cc] transition-colors"
            >
              Start Creating <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 border border-[#6469ff] text-[#6469ff] rounded-md font-medium hover:bg-[#6469ff] hover:text-white transition-colors"
            >
              Explore Gallery
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#222328] text-center mb-8">
            Community Showcase
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-8 h-8 animate-spin text-[#6469ff]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="relative rounded-xl overflow-hidden h-64 group cursor-pointer"
                  onClick={() => navigate("/home")}
                >
                  <img
                    src={post.photo}
                    alt={post.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <p className="text-white text-center text-sm mb-2">
                      {post.prompt}
                    </p>
                    <p className="text-white text-center text-xs">
                      by {post.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#222328]">
          Why Choose Our Platform
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-[#6469ff] transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#f9fafe]">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#222328]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[#666e75]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f9fafe] py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#222328]">
            Ready to Start Creating?
          </h2>
          <p className="mt-4 text-lg text-[#666e75]">
            Join our community of creators and start generating amazing images
            today.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-8 py-4 bg-[#6469ff] text-white rounded-md font-medium hover:bg-[#5054cc] transition-colors"
          >
            Sign Up Now - It's Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
