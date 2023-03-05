import { useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

import { callGetQuestionDetails } from "./question.slice";

function App() {

  const { numberOfQuestions, currentQuestion, loading, questionNumber } = useSelector(state => state.question);

  const dispatch = useDispatch();

  useEffect(() => {
    if (numberOfQuestions?.length) {
      dispatch(callGetQuestionDetails(numberOfQuestions[questionNumber]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfQuestions]);

  const handleQuestionNumber = (isNext) => {
    const number = isNext ? questionNumber + 1 : questionNumber - 1;
    dispatch(callGetQuestionDetails(numberOfQuestions[number], number));
  }

  return (
    <div className="container">
      <div className="my-5 w-100">
        {loading ?
          <div className="my-2"><Skeleton height={40} enableAnimation={true} /></div> :
          <p className="h4">{`Question ${questionNumber + 1} of ${numberOfQuestions.length}`}</p>}
        <div className="border rounded py-5 px-4">
          {loading ? <Skeleton height={60} enableAnimation={true} /> :
            (!!currentQuestion?.Question && <MathJax>
              {currentQuestion?.Question}
            </MathJax>)
          }
        </div>
        <div className="d-flex justify-content-end align-items-center my-2">
          <button
            className="btn btn-danger m-2"
            disabled={loading || questionNumber === 0}
            onClick={() => handleQuestionNumber(false)}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            disabled={loading || questionNumber === (numberOfQuestions.length - 1)}
            onClick={() => handleQuestionNumber(true)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
