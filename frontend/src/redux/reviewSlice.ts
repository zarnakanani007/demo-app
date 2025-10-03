import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Review {
    _id: string,
    user: {
        name: string
    },
    rating: number;
    comment: number;
    createdAt: string
}

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null
}

//Get reviews for a product
export const fetchProductReviews = createAsyncThunk(
    'reviews/fetchProductReviews',
    async (productId: string) => {
        const response = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`)
        return response.data.reviews
    }
)

//Add new reviews
export const addReview = createAsyncThunk(
    'reviews/addReviews',
    async ({ productId, rating, comment, token }: {
        productId: string;
        rating: number;
        comment: string;
        token: string;
    }) => {
        const response = await axios.post(
            'http://localhost:5000/api/reviews',
            { productId, rating, comment },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response.data.review
    }
)

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        clearReviews: (state) => {
            state.reviews = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch reviews"
            })

            //Add review
            .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
                state.reviews.unshift(action.payload)
            })
    }
})

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;