import axios from "axios";

const API_URL = "https://aiala.troshi.in/api";

export const AssessmentRequest = async ({ grade, board, subject,
  chapter,
  description,
  blanks,
  question,
  matchfollowing,
  marks_choose,
  marks_blanks,
  marks_question,
  marks_match,
  total_marks,
  timeLimit,
  validity,
  sender,
  sessionID,
  chatID,
  gradeNumber,
  choose }) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/AssesmentRequest`, {
      grade,
      board,
      subject,
      chapter,
      description,
      blanks,
      question,
      matchfollowing,
      marks_choose,
      marks_blanks,
      marks_question,
      marks_match,
      total_marks,
      timeLimit,
      validity,
      sender,
      sessionID,
      chatID,
      gradeNumber,
      choose
    }
    );
    return response.data;

  } catch (error) {
    console.error("Error fetching pending assessments:", error);
    throw error;
  }
};


export const updateAssessment = async (text) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/updateAssessment`, { text }
    );
    return response.data;

  } catch (error) {
    console.error("Error fetching pending assessments:", error);
    throw error;
  }
};

export const getGradesInstitutes = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/getGradesInstitutes`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { teacher_username: username },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};

export const studentAssessment = async ( action,
  assessmentId,
  publishGrade,
  publishIns,
  username ) => {
  try {
    const response = await axios.post(`${API_URL}/users/studentAssessment`, {
      action,
      assessment_id: assessmentId,
      grades: publishGrade,
      institutes: publishIns,
      username
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching document content:", error.response?.data || error.message || error.toString());
    throw error;
  }
};






