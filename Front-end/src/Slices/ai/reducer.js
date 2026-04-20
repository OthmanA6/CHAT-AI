import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const sendMessage = createAsyncThunk(
    "ai/sendMessage",
    async ({ message, model = "gpt-4o-mini", attachments = [] }, { rejectWithValue }) => {
        try {
            let input = message;

            // If there are attachments, format as multimodal array
            if (attachments.length > 0) {
                const content = [];
                if (message) content.push({ type: "input_text", text: message });
                
                attachments.forEach(file => {
                    const type = file.mimetype.startsWith("image/") ? "input_image" : "input_file";
                    if (type === "input_image") {
                        content.push({ type: "input_image", image_url: file.fileUrl });
                    } else {
                        content.push({ type: "input_file", file_url: file.fileUrl });
                    }
                });

                input = [
                    {
                        role: "user",
                        content: content
                    }
                ];
            }

            const response = await axios.post(`${API_URL}/generate`, {
                input: input,
                model: model
            });
            return response.data;
        } catch (error) {
            const errDetails = error.response?.data?.error || error.response?.data?.message || "Something went wrong";
            return rejectWithValue(errDetails);
        }
    }
);

export const uploadFile = createAsyncThunk(
    "ai/uploadFile",
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data; // { fileUrl, filename, mimetype }
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Upload failed");
        }
    }
);

export const generateImage = createAsyncThunk(
    "ai/generateImage",
    async ({ prompt }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/generate-image`, {
                prompt: prompt
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.error || error.response?.data?.message || "Failed to generate image";
            return rejectWithValue(message);
        }
    }
);

const aiSlice = createSlice({
    name: "ai",
    initialState: {
        chatHistory: [],
        generatedImages: [],
        loading: false,
        imageLoading: false,
        error: null,
    },
    reducers: {
        clearChat: (state) => {
            state.chatHistory = [];
        },
        clearImages: (state) => {
            state.generatedImages = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                // Add user message to history
                const message = action.meta.arg.message;
                const attachments = action.meta.arg.attachments || [];
                state.chatHistory.push({
                    role: "user",
                    content: message,
                    attachments: attachments
                });
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.chatHistory.push({
                    role: "assistant",
                    content: action.payload.data
                });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Image Generation
            .addCase(generateImage.pending, (state) => {
                state.imageLoading = true;
                state.error = null;
            })
            .addCase(generateImage.fulfilled, (state, action) => {
                state.imageLoading = false;
                state.generatedImages.unshift(...action.payload.data);
            })
            .addCase(generateImage.rejected, (state, action) => {
                state.imageLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearChat, clearImages } = aiSlice.actions;
export default aiSlice.reducer;
