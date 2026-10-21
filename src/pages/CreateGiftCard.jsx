import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import Header from "../components/Dashboard/Header";
import GiftCardFormSection from "../components/CreateGiftCard/components/GiftCardFormSection";
import {
  createGiftCard,
  getGiftCardById,
  updateGiftCard,
} from "../services/api/giftCards";

const CreateGiftCard = () => {
  const navigate = useNavigate();
  const { giftCardId } = useParams();
  const isEditing = Boolean(giftCardId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
      quantity: 1,
      image: "",
      expirationDate: "",
      codePrefix: "GAMER2024",
      notes: "",
    },
  });

  useEffect(() => {
    if (!giftCardId) return;
    getGiftCardById(giftCardId)
      .then((giftCard) => {
        reset({
          amount: giftCard.amount ?? "",
          quantity: giftCard.quantity ?? giftCard.generatedQuantity ?? 1,
          image: giftCard.image || "",
          expirationDate: giftCard.expiresAt
            ? new Date(giftCard.expiresAt).toISOString().slice(0, 10)
            : "",
          codePrefix: giftCard.codePrefix || "GAMER",
          notes: giftCard.notes || "",
        });
      })
      .catch((err) => {
        console.error("Unable to load gift card batch:", err);
      });
  }, [giftCardId, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        amount: Number(data.amount),
        quantity: Number(data.quantity),
        image: data.image || null,
        expiresAt: data.expirationDate || null,
        codePrefix: data.codePrefix,
        notes: data.notes,
      };
      if (isEditing) await updateGiftCard(giftCardId, payload);
      else await createGiftCard(payload);
      navigate("/dashboard/gift-cards");
    } catch (err) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} gift cards:`,
        err
      );
    }
  };

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={() => navigate("/dashboard/gift-cards")}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              {isEditing ? "Edit Gift Card Batch" : "Create Gift Cards"}
            </h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Generate new gift cards for your customers
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <GiftCardFormSection
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/gift-cards")}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin text-xs sm:text-sm" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaSave className="text-xs sm:text-sm" />
                <span>{isEditing ? "Save Changes" : "Create Gift Cards"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateGiftCard;
