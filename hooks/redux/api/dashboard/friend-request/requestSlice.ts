import { apiSlice } from "@/hooks/redux/api/apiSlice";

export const RequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (data) => ({
        url: "/friend-requests",
        method: "POST",
        body: data,
      }),
    }),
    acceptRequest: builder.mutation({
      query: (requestId: string) => ({
        url: `/friend-requests/${requestId}`,
        method: "PUT",
      }),
    }),
    deleteRequest: builder.mutation({
      query: (requestId: string) => ({
        url: `/friend-requests/${requestId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useAcceptRequestMutation,
  useDeleteRequestMutation,
} = RequestApiSlice;
