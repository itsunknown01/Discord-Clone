import { apiSlice } from "@/hooks/redux/api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (userId) => `/notifications/${userId}`,
    }),
    markNotificaitonAsRead: builder.mutation<void, string>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PUT",
        body: { notificationId },
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkNotificaitonAsReadMutation } =
  notificationApiSlice;
