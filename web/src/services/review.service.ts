import api from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";
import type { ReviewPayload } from "../api/types";

export const createReview = async (review: ReviewPayload) => {
  const response = await api.post(API_ENDPOINTS.REVIEW.CREATE, review);
  return response.data;
};
