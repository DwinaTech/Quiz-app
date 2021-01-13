import { Paper, Button, Typography } from "@material-ui/core";
import { createMarkup } from "../helpers";

const AnswersReview = ({ processedAnswers, classes, resetQuiz }) => {
  const renderAnswers = (answers) => {
    return answers.map(
      ({ question, isCorrect, correctAnswer, wrongAnswer }) => (
        <Paper key={question} className={classes.paper}>
          <Typography variant="h2" className={classes.question}>
            <span dangerouslySetInnerHTML={createMarkup(question)} />
          </Typography>

          {isCorrect ? (
            <Typography variant="h2" className={classes.answer}>
              Correct Answer:{" "}
              <span dangerouslySetInnerHTML={createMarkup(correctAnswer)} />
            </Typography>
          ) : (
            <>
              <Typography variant="h3" className={classes.answer}>
                Wrong Answer:{" "}
                <span dangerouslySetInnerHTML={createMarkup(wrongAnswer)} />
              </Typography>
              <Typography variant="h3" className={classes.answer}>
                Correct Answer:{" "}
                <span dangerouslySetInnerHTML={createMarkup(correctAnswer)} />
              </Typography>
            </>
          )}
        </Paper>
      )
    );
  };

  return (
    <>
      <Typography variant="h1" className={classes.mainTitle}>
        Answers review:
      </Typography>
      {renderAnswers(processedAnswers)}
      <Button
        className={classes.submitButton}
        onClick={resetQuiz}
        variant="contained"
        color="primary"
      >
        Reset
      </Button>
    </>
  );
};

export default AnswersReview;
