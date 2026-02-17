import { useState } from "react";
import type { Order, ReviewPayload } from "../../api/types";
import { createReview } from "../../services/review.service";
import toast from "react-hot-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  reviewSchema,
  type ReviewFormValues,
} from "../../schemas/review.schema";

function Review({ onClick, data }: { onClick: () => void; data: Order }) {
  const [rating, setRating] = useState(1);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
  });

  const {
    control,
    register,
    formState: { errors },
  } = form;

  const handleSubmit = async (formData: ReviewFormValues) => {
    try {
      const payload: ReviewPayload = {
        userId: user.id,
        eventId: data.ticket.eventName.id,
        orderId: data.id,
        rating,
        comment: formData.comment,
      };
      console.log(payload);
      await createReview(payload);

      toast.success("Review added successfully");
      onClick();
    } catch (error) {
      toast.error("Failed to add review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form
        onSubmit={form.handleSubmit(handleSubmit, (error) =>
          console.log(error),
        )}
        className="bg-white dark:bg-card-dark rounded-2xl w-full max-w-md shadow-2xl transform transition-all overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Write a Review
          </h3>
          <button
            type="button"
            onClick={onClick}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <img
                alt="Neon Nights Festival 2024"
                className="w-full h-full object-cover"
                src={data.ticket.eventName.heroImage}
              />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                {data.ticket.eventName.name}
              </h4>
              <p className="text-xs text-subtext-light dark:text-subtext-dark mt-1">
                {data.ticket.eventName.city}
              </p>
            </div>
          </div>
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How would you rate your experience?
            </p>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= rating;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    className="group focus:outline-none"
                  >
                    <span
                      className={`material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors group-hover:scale-110 ${isFilled ? "text-yellow-400 star-glow" : ""}`}
                    >
                      star
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-primary font-medium mt-2">Excellent!</p>
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="review"
            >
              Share your thoughts
            </label>
            <textarea
              {...register("comment")}
              className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary/20 transition-all resize-none text-sm p-3"
              id="review"
              placeholder="What did you enjoy most about the event?"
              rows={4}
            ></textarea>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-subtext-light dark:text-subtext-dark">
                *200 characters
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 pt-2 bg-white dark:bg-card-dark">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-primary/40 transition-all duration-200 flex items-center justify-center group transform active:scale-[0.98]"
          >
            <span className="material-icons-outlined mr-2 animate-bounce">
              stars
            </span>
            Submit Review &amp; Earn +50 pts
          </button>
          <button
            type="button"
            onClick={onClick}
            className="w-full mt-3 py-2 text-sm text-subtext-light dark:text-subtext-dark hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    //   <form
    //     onSubmit={form.handleSubmit(handleSubmit)}
    //     className="bg-white dark:bg-card-dark w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative animate-in fade-in zoom-in-95 duration-200"
    //   >
    //     <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-card-dark z-10">
    //       <div className="flex items-center space-x-3">
    //         <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
    //           <img
    //             alt="Event Thumbnail"
    //             className="w-full h-full object-cover"
    //             src={data.ticket.eventName.heroImage}
    //           />
    //         </div>
    //         <div>
    //           <h3 className="font-bold text-text-light dark:text-white text-sm leading-tight">
    //             {data.ticket.eventName.name}
    //           </h3>
    //           <p className="text-xs text-subtext-light dark:text-subtext-dark">
    //             Rate your experience
    //           </p>
    //         </div>
    //       </div>
    //       <button
    //         onClick={onClick}
    //         className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
    //       >
    //         <span className="material-symbols-outlined">close</span>
    //       </button>
    //     </div>
    //     <div className="overflow-y-auto p-6 space-y-8">
    //       <div className="flex flex-col items-center justify-center space-y-3">
    //         <div className="flex items-center space-x-2">
    //           {Array.from({ length: 5 }).map((_, index) => {
    //             const starValue = index + 1;
    //             const isFilled = starValue <= rating;
    //             return (
    //               <button
    //                 key={starValue}
    //                 type="button"
    //                 onClick={() => setRating(starValue)}
    //                 className="group focus:outline-none"
    //               >
    //                 <span
    //                   className={`material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors group-hover:scale-110 ${isFilled ? "text-yellow-400" : ""}`}
    //                 >
    //                   star
    //                 </span>
    //               </button>
    //             );
    //           })}
    //           {/* {Array.from({ length: rating }).map((_, index) => (
    //             <button key={index} className="group focus:outline-none">
    //               <span className="material-symbols-outlined text-4xl text-yellow-400 fill-1 transition-transform group-hover:scale-110">
    //                 star
    //                 {index}
    //               </span>
    //             </button>
    //           ))}
    //           {Array.from({ length: 5 - rating }).map((_, index) => (
    //             <button key={index} className="group focus:outline-none">
    //               <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors group-hover:scale-110">
    //                 star
    //                 {index}
    //               </span>
    //             </button>
    //           ))} */}
    //         </div>
    //         <span className="text-primary font-semibold text-lg">Amazing</span>
    //       </div>
    //       <div className="space-y-2">
    //         <label
    //           className="block text-sm font-medium text-text-light dark:text-gray-300"
    //           htmlFor="review"
    //         >
    //           Write a review
    //         </label>
    //         <div className="relative">
    //           <textarea
    //             className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm text-text-light dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
    //             id="review"
    //             placeholder="Share details about the venue, atmosphere, or performances..."
    //             rows={4}
    //           ></textarea>
    //           <div className="absolute bottom-3 right-3 text-xs text-gray-400">
    //             0/500
    //           </div>
    //         </div>
    //       </div>
    //       {/* <div className="space-y-3">
    //         <label className="block text-sm font-medium text-text-light dark:text-gray-300">
    //           Add photos
    //           <span className="text-xs font-normal text-gray-400 ml-1">
    //             (Optional, max 3)
    //           </span>
    //         </label>
    //         <div className="flex space-x-3">
    //           <button className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary-soft/20 dark:hover:bg-gray-800 transition-all group">
    //             <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">
    //               add_a_photo
    //             </span>
    //           </button>
    //           <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-700/50"></div>
    //           <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-700/50"></div>
    //         </div>
    //       </div> */}
    //     </div>
    //     <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-card-dark/50 backdrop-blur-sm sticky bottom-0">
    //       <div className="flex flex-col space-y-3">
    //         <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 py-1.5 px-3 rounded-full w-max mx-auto border border-yellow-200 dark:border-yellow-700/30">
    //           <span className="material-symbols-outlined text-lg">
    //             monetization_on
    //           </span>
    //           <span className="text-xs font-bold uppercase tracking-wide">
    //             +50 pts reward
    //           </span>
    //         </div>
    //         <button
    //           className="w-full py-3.5 rounded-xl bg-primary/40 text-white font-semibold cursor-not-allowed shadow-none transition-all flex items-center justify-center"
    //           disabled
    //         >
    //           Submit Review
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}

export default Review;
