import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Download,
  Share2,
  Wand2,
  Sparkles,
  Image,
  Grid,
  Palette,
} from "lucide-react";
import { preview } from "../assets";
import { saveAs } from "file-saver";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        setError("");

        const response = await fetch("http://localhost:8080/api/v1/clipdrop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setForm({ ...form, photo: data.photo });
      } catch (err) {
        console.error("Error generating image:", err);
        setError(err.message || "Failed to generate image");
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setError("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/home");
      } catch (err) {
        setError(err.message || "Failed to share image");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const getImage = () => {
    if (form.photo) {
      saveAs(form.photo, `generated-image-${Date.now()}.jpg`);
    } else {
      setError("No image available to download");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Sparkles className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-semibold text-gray-900">AI-Powered Creation</h3>
            <p className="text-sm text-gray-500 mt-1">
              Transform your ideas into stunning artwork with advanced AI
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Download className="w-8 h-8 text-teal-500 mb-3" />
            <h3 className="font-semibold text-gray-900">Instant Download</h3>
            <p className="text-sm text-gray-500 mt-1">
              Get your creations in high quality with one click
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Share2 className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900">Community Sharing</h3>
            <p className="text-sm text-gray-500 mt-1">
              Share your artwork with our creative community
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="border-b border-gray-200 bg-gray-50 rounded-t-xl px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Create Your Art
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Let your imagination run wild with AI-powered image generation
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormField
                    labelName="Your Name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    handleChange={handleChange}
                  />
                  <div className="space-y-3">
                    <FormField
                      labelName="Prompt"
                      type="text"
                      name="prompt"
                      placeholder="Describe the image you want to create..."
                      value={form.prompt}
                      handleChange={handleChange}
                      isSurpriseMe
                      handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={generateImage}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                        disabled={generatingImg}
                      >
                        <Wand2 className="w-5 h-5" />
                        {generatingImg ? "Generating..." : "Generate"}
                      </button>
                      {form.photo && (
                        <button
                          type="button"
                          onClick={getImage}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2.5 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-sm"
                        >
                          <Download className="w-5 h-5" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <Camera className="w-16 h-16 mb-4" />
                      <p className="text-sm text-center px-4">
                        Your masterpiece will appear here
                      </p>
                    </div>
                  )}
                  {generatingImg && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                      <Loader />
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Ready to inspire others? Share your creation with our growing
                  community of artists and creators!
                </p>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6469ff] to-[#7c81ff] text-white px-6 py-3 rounded-lg hover:from-[#5156ff] hover:to-[#6469ff] transition-all duration-200 shadow-sm"
                  disabled={loading}
                >
                  <Share2 className="w-5 h-5" />
                  {loading ? "Sharing..." : "Share with Community"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
