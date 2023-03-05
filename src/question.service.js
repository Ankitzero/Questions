import httpClient from "./api/httpclient";

export const getQuestionDetails = (QuestionID) => httpClient(`/getQuestionDetails/getquestiondetails?QuestionID=${QuestionID}`);