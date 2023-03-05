import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import { getQuestionDetails } from "./question.service";


export const questionSlice = createSlice({
	name: "question",
	initialState: {
		loading: false,
		numberOfQuestions: ["AreaUnderTheCurve_901","BinomialTheorem_901","DifferentialCalculus2_901"],
		currentQuestion: {},
		questionNumber: 0
	},

	//reducers
	reducers: {
		loading: (state, { payload = true }) => {
			state.loading = payload;
		},
		setCurrentQuestion: (state, { payload = {} }) => {
			state.loading = false;
			state.currentQuestion = payload
		},
		setQuestionNumber: (state, { payload = 0 }) => {
			state.questionNumber = payload
		},
	},
});


export const {
	loading, setCurrentQuestion, setQuestionNumber
} = questionSlice.actions;

//action Creators

export const callGetQuestionDetails = (questionID, questionNumber) => {
	return async (dispatch) => {
		try {
			dispatch(loading(true));
			const {data} = await getQuestionDetails(questionID);
			if (!!data && data.length) {
				dispatch(setQuestionNumber(questionNumber));
				dispatch(setCurrentQuestion(data[0]));
			} else {
				Swal.fire("Something went wrong!", "", "warning");
				dispatch(loading(false));
			}
		} catch (err) {
			Swal.fire("Something went wrong!", "", "warning");
			dispatch(loading(false))
			console.error(err);
		}
	};
};

//reducer export
export default questionSlice.reducer;
