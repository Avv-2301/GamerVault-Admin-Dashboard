import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import Header from "../components/Dashboard/Header";
import BasicInfoSection from "../components/CreateGame/components/BasicInfoSection";
import PricingSection from "../components/CreateGame/components/PricingSection";
import MediaSection from "../components/CreateGame/components/MediaSection";
import RequirementsSection from "../components/CreateGame/components/RequirementsSection";
import AdditionalInfoSection from "../components/CreateGame/components/AdditionalInfoSection";
import GameDetailInfoSection from "../components/CreateGame/components/GameDetailInfoSection";
import { createGame } from "../services/api/game";
import { generateSlug } from "../services/helper";

const CreateGame = () => {
  const navigate = useNavigate();
  const [isProcessingThumbnail, setIsProcessingThumbnail] = useState(false);
  const [isProcessingMedia, setIsProcessingMedia] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      category: "",
      thumbnail: null,
      thumbnailPreview: null,
      price: "",
      discountPrice: "",
      discountPercentage: 0,
      isDiscountActive: false,
      releaseDate: "",
      developer: "",
      publisher: "",
      genres: [],
      tags: [],
      images: [],
      videos: [],
      screenshots: [],
      systemRequirements: {
        minimum: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
          directX: "",
        },
        recommended: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
          directX: "",
        },
      },
      languages: [],
      languageSupport: [],
      supportedFeatures: [],
      featureHighlights: [],
      matureContentDescription: "",
      metascore: "",
      achievementCount: "",
      ageRating: "RP",
      platform: [],
      downloadSize: "",
      isActive: true,
      isFeatured: false,
      stock: -1,
    },
  });

  const watchedName = watch("name");
  const watchedSlug = watch("slug");

  // Auto-generate slug from name
  useEffect(() => {
    if (watchedName && !watchedSlug) {
      setValue("slug", generateSlug(watchedName));
    }
  }, [watchedName, watchedSlug, setValue]);

  const onSubmit = async (data) => {
    try {
      const submitData = {
        ...data,
        price: parseFloat(data.price),
        discountPrice: data.discountPrice
          ? parseFloat(data.discountPrice)
          : null,
        discountPercentage: parseFloat(data.discountPercentage) || 0,
        metascore: data.metascore == null || data.metascore === "" ? null : Number(data.metascore),
        achievementCount: data.achievementCount == null || data.achievementCount === "" ? 0 : Number(data.achievementCount),
        stock:
          data.stock === "" || data.stock === -1 ? -1 : parseInt(data.stock),
        releaseDate: new Date(data.releaseDate),
      };

      delete submitData.thumbnailPreview;

      const response = await createGame(submitData);

      if (response?.meta?.code === 201) {
        navigate("/dashboard/games");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
      <Header />

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <button
            onClick={() => navigate("/dashboard/games")}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              Create New Game
            </h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Add a new game to your catalog
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <BasicInfoSection
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
            isProcessingThumbnail={isProcessingThumbnail}
            onImageProcessingChange={setIsProcessingThumbnail}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <PricingSection
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <MediaSection
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
            onProcessingChange={setIsProcessingMedia}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <RequirementsSection
            register={register}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <GameDetailInfoSection register={register} control={control} />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <AdditionalInfoSection
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/games")}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isProcessingThumbnail || isProcessingMedia}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin text-xs sm:text-sm" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaSave className="text-xs sm:text-sm" />
                <span>Create Game</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateGame;
