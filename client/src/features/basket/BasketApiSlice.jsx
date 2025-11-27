import apiSlice from "../../app/apiSlice"
const basketApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getMyBasket: build.query({
            query: () => ({
                url: 'api/basket',
                method: "GET"
            }),
            providesTags: ["basket"]
        }),
        addToBasket: build.mutation({
            query: (productId) => ({
                url: `api/basket/${productId}`,
                method: "PUT",

            }),

            invalidatesTags: ["basket"]
        }),
        decreaseFromBasket: build.mutation({
            query: (productId) => ({
                url: `api/basket/decrease/${productId}`,
                method: "PUT",

            }),
            invalidatesTags: ["basket"]
        }),
        updateQuantity: build.mutation({
            query: (obj) => ({
                url: 'api/basket',
                method: "PUT",
                body: obj
            }),
            invalidatesTags: ["basket"]
        }),
        addFirst: build.mutation({
            query: (id) => ({
                url: `/api/basket/first/${id}`,
                method: "POST"
            }),
            invalidatesTags: ['basket']
        }),
        removerFromBasket: build.mutation({
            query: (productId) => ({
                url: `/api/basket/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['basket']
        }),
        getCount: build.query({
            query: () => ({
                url: 'api/basket/count',
                method: "GET"
            }),
             providesTags: ['basket']
        }),
    })
})



export const { useGetMyBasketQuery, useAddToBasketMutation,
    useDecreaseFromBasketMutation, useUpdateQuantityMutation,
    useAddFirstMutation ,useRemoverFromBasketMutation, useGetCountQuery} = basketApiSlice