import { Button, Typography } from "@material-ui/core";

const TotalResults = ({
  classes,
  resetQuiz,
  processedAnswers,
  setCurrentQuizStep,
}) => (
  <div className={classes.results}>
    <Typography variant="h1" className={classes.mainTitle}>
      Results
    </Typography>
    <Typography variant="h4">
      {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}
      {processedAnswers.length}
    </Typography>
    <Button
      onClick={(e) => {
        setCurrentQuizStep("review");
      }}
      className={classes.submitButton}
      variant="contained"
      color="primary"
    >
      Review
    </Button>{" "}
    <Button
      onClick={resetQuiz}
      className={classes.submitButton}
      variant="contained"
      color="primary"
    >
      Reset
    </Button>
  </div>
);

export default TotalResults;
