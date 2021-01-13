import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { createMarkup } from "../helpers";
import TotalResults from "./TotalResults";

const QuizAnswers = ({
  classes,
  quizData,
  resetQuiz,
  currentQuizStep,
  setCurrentQuizStep,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [processedAnswers, setProcessedAnswers] = useState([]);

  const handleResult = (e) => {
    e.preventDefault();

    const processedAnswers = selectedAnswers.map(({ answer, question }) => {
      const relatedQuestion = quizData.find(
        (category) => category.question === question
      );
      if (relatedQuestion.correct_answer === answer) {
        return { correctAnswer: answer, isCorrect: true, question };
      }
      return {
        correctAnswer: relatedQuestion.correct_answer,
        wrongAnswer: answer,
        isCorrect: false,
        question,
      };
    });

    setProcessedAnswers(processedAnswers);
  };

  const handleAnswerChange = (e, selectedQuestion) => {
    e.preventDefault();
    const { value } = e.target;

    const isExistQuestion =
      selectedAnswers.length &&
      selectedAnswers.find((answer) => answer.question === selectedQuestion);

    if (isExistQuestion && isExistQuestion.answer) {
      const updatedAnswers = selectedAnswers.map((answer) => {
        if (answer.question === selectedQuestion) {
          return { question: selectedQuestion, answer: value };
        }
        return answer;
      });
      setSelectedAnswers(updatedAnswers);
    } else {
      setSelectedAnswers([
        ...selectedAnswers,
        { question: selectedQuestion, answer: value },
      ]);
    }
  };

  const relatedAnswer = (question, selectedAnswers) => {
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        (answer) => answer.question === question
      );
      return (relatedQuestion && relatedQuestion.answer) || "";
    }
    return "";
  };

  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);

  return !processedAnswers || !processedAnswers.length ? (
    <>
      <Typography variant="h1" className={classes.mainTitle}>
        Answer flowing Questions:
      </Typography>
      <form onSubmit={handleResult}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {quizData.map((quiz) => (
              <Paper key={quiz.question} className={classes.paper}>
                <Typography variant="h5" className={classes.question}>
                  <span dangerouslySetInnerHTML={createMarkup(quiz.question)} />
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="answer-select-label">
                    Select answer:
                  </InputLabel>
                  <Select
                    required
                    name="answer"
                    id="answer-select"
                    label="Select answer"
                    value={relatedAnswer(quiz.question, selectedAnswers) || ""}
                    labelId="answer-select-label"
                    onChange={(e) => handleAnswerChange(e, quiz.question)}
                  >
                    {quiz.answers.map((answer) => (
                      <MenuItem key={answer} value={answer}>
                        <span dangerouslySetInnerHTML={createMarkup(answer)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            ))}
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
            >
              Result
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  ) : (
    <TotalResults
      classes={classes}
      resetQuiz={resetQuiz}
      currentQuizStep={currentQuizStep}
      processedAnswers={processedAnswers}
      setCurrentQuizStep={setCurrentQuizStep}
    />
  );
};

export default QuizAnswers;
