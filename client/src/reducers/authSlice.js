import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely retrieve and parse user details from localStorage
const getUserDetails = () => {
  const user = localStorage.getItem('cbUser'); // Get the user data from localStorage
  if (user) {
    try {
      return JSON.parse(user); // Parse the user data if it exists
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('cbUser'); // Remove invalid data from localStorage
      return null; // Return null if parsing fails
    }
  }
  return null; // Return null if no user data is found
};

// Initial state for the auth slice
const initialState = {
  currentUser: getUserDetails(), // Safely initialize currentUser
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for user login
    userLogin: (state, action) => {
      localStorage.setItem('cbUser', JSON.stringify(action.payload)); // Save user data to localStorage
      state.currentUser = action.payload; // Update the currentUser in the state
    },
    // Reducer for user logout
    userLogout: (state) => {
      localStorage.removeItem('cbUser'); // Remove user data from localStorage
      state.currentUser = null; // Clear the currentUser in the state
    },
  },
});

// Export the actions
export const { userLogin, userLogout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;