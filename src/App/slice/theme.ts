import { RootState } from "./../store/store";
import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
  name: "theme",
  initialState: { theme: "light" },
  reducers: {
    setTheme: (state, action) => {
      if (localStorage.getItem("theme") === "dark") {
        localStorage.setItem("theme", "light");
        state.theme = "light";
        document.documentElement.classList.remove("dark");
      } else {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
        state.theme = "dark";
      }
    },
  },
});

export const { setTheme } = theme.actions;
export default theme.reducer;

export const currentTheme = (state: RootState) => state.Theme.theme;
