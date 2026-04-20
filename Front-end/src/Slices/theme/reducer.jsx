import { createSlice } from "@reduxjs/toolkit";

// Define theme mode constants
export const THEME_MODE = {
    LIGHT: "light",
    DARK: "dark"
};

export const THEME_SIDEBAR_TOGGLE = {
    TRUE: 1,
    FALSE: 0
};

// Initial state
const initialState = {
    themeType: THEME_MODE.LIGHT,
    themeSidebarToggle: THEME_SIDEBAR_TOGGLE.FALSE
};

// Create slice using createSlice from Redux Toolkit
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // Change theme action
        changeTheme(state, action) {
            state.themeType = action.payload;
        },
        changeSidebarThemeToggle(state, action) {
            state.themeSidebarToggle = action.payload;
        },
    }
});

// Export actions and reducer
export const { changeTheme, changeSidebarThemeToggle } = themeSlice.actions;
export default themeSlice.reducer;
