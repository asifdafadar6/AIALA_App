
import axios from "axios";

const API_URL = "https://aiala.troshi.in/api";

export const getStudents = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/teachers/getStudents`, { username });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Students:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};

export const getActiveStudents = async (username, grades) => {
  try {
    const responses = await Promise.all(
      grades.map(async (grade) => {
        const response = await axios.post(
          `${API_URL}/teachers/getActiveStudents`,
          { username, grade },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        return { grade, data: response.data };
      })
    );
    return responses;
  } catch (error) {
    console.error(
      "Error fetching Active Students:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};

export const getAllEducationalContent = async (user, token) => {
  try {

    const userParams = { username: user };
    const response = await axios.get(`${API_URL}/users/getAllEducationalContent`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: userParams
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching educational content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

// Assistant

export const generateLessonPlan = async (lessonData) => {
  try {
    const response = await axios.post(`${API_URL}/users/generatelessonplan`, lessonData);

    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const updateLessonPlan = async (lessonData) => {
  try {
    const response = await axios.post(`${API_URL}/users/updateLessonPlan`, lessonData);
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};
export const updateActivity = async (activeData) => {
  try {
    const response = await axios.post(`${API_URL}/users/updateActivity`, activeData);

    console.log("generateLessonPlan response:", response.data);
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};


// Assessment
export const getAllTeacherAssessments = async (user) => {
  try {
    const response = await axios.get(`${API_URL}/users/getAllTeacherAssessments`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { username: user },
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const getAllStudentAssessments = async (user) => {
  try {
    const response = await axios.get(`${API_URL}/users/getAllStudentAssessments`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { username: user },
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};


export const getGrades = async () => {
  try {
    const response = await axios.post(`${API_URL}/assesment/getGrades`);

    return response.data;

  } catch (error) {
    console.error("Error fetching grades:", error);
    throw error;
  }
};

export const getBoards = async (gradeId) => { 
  try {
    const response = await axios.post(`${API_URL}/assesment/getBoards`, { grade: gradeId });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching boards:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};



export const getSubjects = async (grade, board) => {
  try {
    const response = await axios.post(
      `${API_URL}/assesment/getSubjects`,
      { grade, board },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subjects:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};

export const getChapters = async (grade, board, subject) => {
  try {
    const response = await axios.post(
      `${API_URL}/assesment/getChapters`,
      { grade, board, subject },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subjects:",
      error.response?.data || error.message || error.toString()
    );
    throw error; // Throw the error for further handling
  }
};

export const getSubtopic = async (grade, board, subject, chapternumber) => {
  try {
    const response = await axios.post(
      `${API_URL}/assesment/getSubtopic`,
      { grade, board, subject, chapternumber },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subjects:",
      error.response?.data || error.message || error.toString()
    );
    throw error; // Throw the error for further handling
  }
};


export const CompleteSubTopic = async (filters) => {
  try {
    const response = await axios.post(
      `${API_URL}/assesment/CompleteSubTopic`,
      filters,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error fetching subjects:",
      error.response?.data || error.message || error.toString()
    );
    throw error; // Throw the error for further handling
  }
};

export const InsertSubtopic = async (grade, board, subject, chapter_num, aftersub_topic, beforesub_topic, new_subtopic) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/insert-subtopic`,
      { grade, subject, board, chapter_num, aftersub_topic, beforesub_topic, new_subtopic }
    );
    return response;
  } catch (error) {
    console.error(
      "Error fetching subjects:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};

export const updateSyllabus = async (grade, board, subject, chapternumber, subtopic_name, remarks) => {
  try {
    const response = await axios.post(`${API_URL}/assesment/CompleteSubTopic`, { grade, board, subject, chapternumber, subtopic_name, remarks });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Students:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};


export const getDocument = async (grade, board, subject, chapter) => {
  try {
    const response = await axios.post(`${API_URL}/users/getDocument`, { grade, board, subject, selectedChapter: chapter },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

// Study buddy Your Doc
export const getAllUserContent = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/document/getAllUserContent`,
      {
        params: { username },
      }
    );
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};



export const uploadDocument = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/document/uploadDocument`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error uploading the document:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};



export const getAllUserDocumentURL = async (filename) => {
  try {
    const response = await axios.post(`${API_URL}/document/getAllUserDocumentURL`, { filename },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

