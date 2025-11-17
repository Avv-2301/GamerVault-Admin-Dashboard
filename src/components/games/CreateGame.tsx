import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import { showSuccess, showError } from "../../utils/notifications";
import type { ApiError } from "../../services/api";

interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface GameFormData {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice: number | null;
  discountPercentage: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  tags: string[];
  images: string[];
  videos: string[];
  screenshots: string[];
  systemRequirements: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
  languages: string[];
  ageRating: "E" | "E10+" | "T" | "M" | "AO" | "RP";
  platform: ("Windows" | "Mac" | "Linux")[];
  downloadSize: string;
  isActive: boolean;
  isFeatured: boolean;
  stock: number;
}

const CreateGame: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<GameFormData>({
    defaultValues: {
      discountPrice: null,
      discountPercentage: 0,
      genres: [] as string[],
      tags: [] as string[],
      images: [] as string[],
      videos: [] as string[],
      screenshots: [] as string[],
      languages: [] as string[],
      platform: [] as ("Windows" | "Mac" | "Linux")[],
      ageRating: "RP",
      isActive: true,
      isFeatured: false,
      stock: -1,
      systemRequirements: {
        minimum: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
        },
        recommended: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
        },
      },
    },
  });

  const {
    fields: genreFields,
    append: appendGenre,
    remove: removeGenre,
  } = useFieldArray({
    control: control as any,
    name: "genres",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: control as any,
    name: "tags",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: control as any,
    name: "images",
  });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control: control as any,
    name: "videos",
  });

  const {
    fields: screenshotFields,
    append: appendScreenshot,
    remove: removeScreenshot,
  } = useFieldArray({
    control: control as any,
    name: "screenshots",
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: control as any,
    name: "languages",
  });

  // Auto-generate slug from name
  const nameValue = watch("name");
  React.useEffect(() => {
    if (nameValue) {
      const slug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", slug);
    }
  }, [nameValue, setValue]);

  // Calculate discount percentage from price and discount price
  const priceValue = watch("price");
  const discountPriceValue = watch("discountPrice");
  React.useEffect(() => {
    if (priceValue && discountPriceValue && discountPriceValue > 0) {
      const percentage = ((priceValue - discountPriceValue) / priceValue) * 100;
      setValue("discountPercentage", Math.round(percentage));
    } else {
      setValue("discountPercentage", 0);
    }
  }, [priceValue, discountPriceValue, setValue]);

  const onSubmit = async (data: GameFormData) => {
    try {
      setIsLoading(true);

      // Prepare data for API
      const gameData = {
        ...data,
        releaseDate: new Date(data.releaseDate).toISOString(),
        discountPrice: data.discountPrice || null,
        discountPercentage: data.discountPercentage || 0,
      };

      // TODO: Replace with actual API call
      // const response = await apiPost(API_CONFIG.endpoints.games.create, gameData);
      
      console.log("Game data to submit:", gameData);
      
      showSuccess("Game created successfully!");
      navigate("/dashboard/games");
    } catch (error) {
      const apiError = error as ApiError;
      showError(apiError.message || "Failed to create game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info" },
    { id: "pricing", label: "Pricing" },
    { id: "details", label: "Details" },
    { id: "media", label: "Media" },
    { id: "requirements", label: "System Requirements" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard/games")}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Create New Game</h1>
              <p className="text-gray-600">Add a new game to your platform</p>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-gray-200">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                px-4 py-2 rounded-t-md font-medium text-sm whitespace-nowrap transition-colors
                ${
                  activeSection === section.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Basic Info Section */}
          {activeSection === "basic" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Game Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Game name is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter game name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("slug", { required: "Slug is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="game-slug"
                />
                {errors.slug && (
                  <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description (max 200 characters)
                </label>
                <textarea
                  {...register("shortDescription", {
                    maxLength: {
                      value: 200,
                      message: "Short description must be 200 characters or less",
                    },
                  })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Brief description of the game"
                />
                {errors.shortDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Detailed description of the game"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Pricing Section */}
          {activeSection === "pricing" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be 0 or greater" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Price (optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("discountPrice", {
                    min: { value: 0, message: "Discount price must be 0 or greater" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
                {errors.discountPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.discountPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  {...register("discountPercentage", {
                    min: { value: 0, message: "Must be between 0 and 100" },
                    max: { value: 100, message: "Must be between 0 and 100" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  Automatically calculated from price and discount price
                </p>
              </div>
            </div>
          )}

          {/* Details Section */}
          {activeSection === "details" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Release Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("releaseDate", { required: "Release date is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.releaseDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.releaseDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Developer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("developer", { required: "Developer is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter developer name"
                />
                {errors.developer && (
                  <p className="text-red-500 text-xs mt-1">{errors.developer.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publisher <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("publisher", { required: "Publisher is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter publisher name"
                />
                {errors.publisher && (
                  <p className="text-red-500 text-xs mt-1">{errors.publisher.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Rating
                </label>
                <select
                  {...register("ageRating")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="RP">RP (Rating Pending)</option>
                  <option value="E">E (Everyone)</option>
                  <option value="E10+">E10+ (Everyone 10+)</option>
                  <option value="T">T (Teen)</option>
                  <option value="M">M (Mature)</option>
                  <option value="AO">AO (Adults Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {["Windows", "Mac", "Linux"].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={platform}
                        {...register("platform", {
                          required: "At least one platform is required",
                        })}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
                {errors.platform && (
                  <p className="text-red-500 text-xs mt-1">{errors.platform.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Download Size
                </label>
                <input
                  type="text"
                  {...register("downloadSize")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 50 GB"
                />
              </div>

              {/* Genres */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genres
                </label>
                <div className="space-y-2">
                  {genreFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input
                        type="text"
                        {...register(`genres.${index}` as const)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter genre"
                      />
                      <button
                        type="button"
                        onClick={() => removeGenre(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendGenre("")}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaPlus />
                    <span>Add Genre</span>
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input
                        type="text"
                        {...register(`tags.${index}` as const)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter tag"
                      />
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendTag("")}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaPlus />
                    <span>Add Tag</span>
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="space-y-2">
                  {languageFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input
                        type="text"
                        {...register(`languages.${index}` as const)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter language"
                      />
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendLanguage("")}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaPlus />
                    <span>Add Language</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Media Section */}
          {activeSection === "media" && (
            <div className="space-y-6">
              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images (URLs)
                </label>
                <div className="space-y-2">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input
                        type="url"
                        {...register(`images.${index}` as const)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendImage("")}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaPlus />
                    <span>Add Image URL</span>
                  </button>
                </div>
              </div>

              {/* Videos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Videos (URLs)
                </label>
                <div className="space-y-2">
                  {videoFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input
                        type="url"
                        {...register(`videos.${index}` as const)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="https://example.com/video.mp4"
                      />
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendVideo("")}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaPlus />
                    <span>Add Video URL</span>
                  </button>
                </div>
              </div>

              {/* Screenshots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Screenshots (URLs)
                </label>
                <div className="space-y-2">
                  {screenshotFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input
                        type="url"
                        {...register(`screenshots.${index}` as const)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="https://example.com/screenshot.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendScreenshot("")}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaPlus />
                    <span>Add Screenshot URL</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Requirements Section */}
          {activeSection === "requirements" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Minimum Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating System
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.minimum.os")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Windows 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processor
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.minimum.processor")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Intel Core i5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Memory
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.minimum.memory")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 8 GB RAM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graphics
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.minimum.graphics")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., NVIDIA GTX 1060"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.minimum.storage")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 50 GB available space"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recommended Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating System
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.recommended.os")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Windows 11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processor
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.recommended.processor")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Intel Core i7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Memory
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.recommended.memory")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 16 GB RAM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graphics
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.recommended.graphics")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., NVIDIA RTX 3070"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage
                    </label>
                    <input
                      type="text"
                      {...register("systemRequirements.recommended.storage")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 100 GB available space"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock (-1 for unlimited)
                </label>
                <input
                  type="number"
                  {...register("stock", {
                    valueAsNumber: true,
                    min: { value: -1, message: "Stock must be -1 or greater" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="-1"
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Active (Game is visible to users)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured (Show on homepage)
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/games")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading && <FaSpinner className="animate-spin" />}
            <span>{isLoading ? "Creating..." : "Create Game"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGame;

