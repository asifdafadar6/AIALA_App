import axios from "axios";

const API_URL = "https://aiala.troshi.in/api";


export const getEvents = async (username, grade) => {
  try {
    const response = await axios.post(`${API_URL}/events/getEvents`, {
      username, grade
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching document content:', error.response?.data || error.message || error.toString());
    throw error;
  }
};


export const getAssessmentDetails = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/results/getAssessmentDetails`, {
      username
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const getPendingAssessments = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/assesment/getPendingAssessments`, {
      username
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};


// Mock Test
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

export const submitAnswers = async (assessmentId, username, selectedAnswers) => {
  try {
    const response = await axios.post(`${API_URL}/users/submitAnswers`, {
      answers: selectedAnswers,
      assessmentId: assessmentId,
      username: username
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const student_assessment_report = async (assessmentId) => {
  try {
    const response = await axios.get(`${API_URL}/users/student_assessment_report`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { assessment_id: assessmentId },
    });

    console.log("student_assessment_report :", response.data);
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const generateCourse = async (courseTopic, difficulty) => {
  try {
    const response = await axios.post(`${API_URL}/course/generateCourse`, {
      message: courseTopic, username: difficulty
    });
    return response.data;

  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const getCourse = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/getCourse`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { username },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching courses:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};

export const flashCards = async ({ grade, board, subject, chapternumber, subtopic_name }) => {
  try {
    const response = await axios({
      method: 'post', 
      url: `${API_URL}/flash_mermaid_retrieval/flash_mermaid_retrieval`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { 
        classid: String(grade),
        board,
        subject,
        chapternumber: String(chapternumber),
        subtopic_name,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching document content:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};



// export const flashCards = async ({ grade, board, subject, chapternumber, subtopic_name }) => {
//   try {
//     const response = await axios({
//       method: 'get',
//       url: `${API_URL}/flash_mermaid_retrieval/flash_mermaid_retrieval`,
//       headers: {
//         'Content-Type': 'application/json',
//         'classid': String(grade),
//         'board': board,
//         'subject': subject,
//         'chapternumber': String(chapternumber),
//         'subtopic_name': subtopic_name,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error fetching document content:",
//       error.response?.data || error.message || error.toString()
//     );
//     throw error;
//   }
// };


// export const flashCards = async ({ grade, board, subject, chapternumber, subtopic_name }) => {
//   try {
//     const response = await axios.get(
//       `${API_URL}/flash_mermaid_retrieval/flash_mermaid_retrieval`,
//       {
//         params: {
//           classid: String(grade),
//           board: String(board),
//           subject: String(subject),
//           chapternumber: String(chapternumber),
//           subtopic_name: String(subtopic_name),
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error fetching document content:",
//       error.response?.data || error.message || error.toString()
//     );
//     throw error;
//   }
// };



export const mockTest = async ( mockData ) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/assesment/MockAssesmentRequest`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:mockData ,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching document content:",
      error.response?.data || error.message || error.toString()
    );
    throw error;
  }
};



