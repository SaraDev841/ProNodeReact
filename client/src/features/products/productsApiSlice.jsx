import apiSlice from "../../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: '/api/product',
                method: "GET"
            }),
            providesTags: ['Product']
        }),
        updateProduct: build.mutation({
            query: (obj) => ({
                url: `/api/product`,
                method: "PUT",
                body: obj
            }),
            invalidatesTags: ['Product']
        }),
        addProducts: build.mutation({
            query: (newProduct) => ({
                url: '/api/product',
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        }),
        singleProduct: build.query({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "GET"
            }),
            invalidatesTags: ['Product']
        }),      
        
        
    })
})

export const { useGetProductsQuery, useAddProductsMutation, 
    useDeleteProductMutation, useUpdateProductMutation, 
    useSingleProductQuery } = productApiSlice


