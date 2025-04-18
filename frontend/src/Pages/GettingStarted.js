import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Sparkles } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    style: "",
    prompt: "",
    profilePicture: null,
  });

  const handleNext = () => {
    if (!formData.name) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.prompt) {
      alert("Please enter a prompt.");
      return;
    }

    if (!formData.style) {
      alert("Please select a content style.");
      return;
    }

    console.log("Sending data to backend:", formData);
    navigate("/Avatar"); // Navigate to the Avatar page
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {["Profile Setup & Content Style"].map((label, index) => (
              <div key={index} className="flex items-center text-blue-400">
                <span className="mr-2">{index + 1}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-lg">
          <h2 className="text-3xl font-bold mb-6">Tell us about yourself</h2>
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Profile Picture
              </label>
              <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-500 transition-colors">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile Preview"
                    className="h-full w-auto rounded-lg"
                  />
                ) : (
                  <>
                    <Camera className="h-8 w-8 text-gray-400" />
                    <label
                      htmlFor="profile-upload"
                      className="mt-2 block text-sm text-gray-400 cursor-pointer"
                    >
                      Upload a photo
                    </label>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Prompt Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                What kind of creator are you?
              </label>
              <textarea
                placeholder="Describe the content you want to create..."
                className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
                rows="4"
              ></textarea>
            </div>

            {/* Content Style */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Select your content style
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["Minimalist", "Vibrant", "Professional", "Casual"].map(
                  (style) => (
                    <button
                      key={style}
                      className={`p-4 rounded-lg border ${
                        formData.style === style
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700 hover:border-blue-500"
                      }`}
                      onClick={() => setFormData({ ...formData, style })}
                    >
                      {style}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center"
            >
              Create Avatar
              <Sparkles className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
