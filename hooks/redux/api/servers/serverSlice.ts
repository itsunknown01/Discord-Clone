import { apiSlice } from "@/hooks/redux/api/apiSlice";

export const serverApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addServer: builder.mutation({
            query: (serverData) => ({
                url: "/servers",
                method: "POST",
                body: serverData,
            })
        })
    })
})

export const { useAddServerMutation } = serverApiSlice