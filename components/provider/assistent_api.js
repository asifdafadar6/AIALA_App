import axios from "axios";

const API_URL = "https://aiala.troshi.in/api";

export const getStudents = async (username) => {
    try {
        console.log("Fetching students for user:", username);
        const response = await axios.post(`${API_URL}/users/generatelessonplan`, { username });
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching Students:",
            error.response?.data || error.message || error.toString()
        );
        throw error;
    }
};

// getAllLessonPlans
export const getAllLessonPlans = async (type, option, username) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/getAllLessonPlans`,
      {
        params: { type, option, username },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data || {};
  } catch (error) {
    console.error("Error fetching grades:", error.response?.data || error.message);
    throw error;
  }
};


// generateActivity
export const getAllActivity = async (type, option, username) => {
  try {
    const response = await axios.get(`${API_URL}/users/getAllactivity`, {
      params: { type, option, username },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data || {};
  } catch (error) {
    console.error("Error fetching activities:", error);
    if (error.response) {
      throw new Error(
        `Failed to fetch activities: ${error.response.status} ${error.response.statusText}`
      );
    } else {
      throw error;
    }
  }
};


export const generateActivity = async (ActivityDetails) => {
  try {
    const response = await axios.post(`${API_URL}/users/generateActivity`, ActivityDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};


