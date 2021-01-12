import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./App.css";

const difficulties = [
  { id: "total_easy_question_count", name: "easy" },
  { id: "total_medium_question_count", name: "medium" },
  { id: "total_hard_question_count", name: "hard" },
];

const answersTypeData = [
  { id: "multiple", name: "Multiple" },
  { id: "boolean", name: "True / False" },
];

const useStyles = makeStyles((theme) => {
  console.log({ theme });
  return {
    paper: {
      padding: "20px",
      marginTop: "20px",
      borderRadius: "20px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    mainTitle: {
      fontSize: "45px",
      marginBottom: "20px",
    },
    submitButton: {
      marginTop: "20px",
      borderRadius: "999px",
      background: "#9c27b0",
      "&:hover": {
        backgroundColor: "#9c27b0",
        boxShadow:
          "0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2)",
      },
    },
  };
});

const App = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });

  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });

  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const classes = useStyles();

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${category.id}&difficulty=${difficulty.name}`;
      const { data } = await axios.get(url);
      const formattedCategory = data.results.map((cat) => ({
        ...cat,
        answers: [...cat.incorrect_answers, cat.correct_answer],
      }));
      setQuizData(formattedCategory);
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    setCategories(data.trivia_categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizData.length && quizNumber && category.id && difficulty) {
      fetchQuizData();
    }
  };

  const handleResult = (e) => {
    e.preventDefault();
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory);
  };

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuizNumber(e.target.value);
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

  const createMarkup = (text) => {
    return { __html: text };
  };

  if (!categories.length) {
    return null;
  }
  console.log({ quizData });
  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h1" className={classes.mainTitle}>
          Quiz App
        </Typography>
        {!quizData || !quizData.length ? (
          <form onSubmit={handleSubmit}>
            {" "}
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="category-select-label">
                    Select category:
                  </InputLabel>
                  <Select
                    required
                    name="category"
                    value={category.id}
                    id="category-select"
                    label="Select category"
                    labelId="category-select-label"
                    onChange={handleSelectChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="difficulty-select-label">
                    Select Difficulty:
                  </InputLabel>
                  <Select
                    required
                    name="difficulty"
                    value={difficulty.id}
                    id="difficulty-select"
                    label="Select Difficulty"
                    labelId="difficulty-select-label"
                    onChange={handleDifficultyChange}
                  >
                    {difficulties.map((difficulty) => (
                      <MenuItem key={difficulty.id} value={difficulty.id}>
                        {difficulty.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ min: 1, max: 10 }}
                  required
                  fullWidth
                  type="number"
                  id="quiz-number"
                  variant="outlined"
                  name="quiz-number"
                  label={`Add a quiz number from 1 to 10`}
                  value={quizNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResult}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {quizData.map((quiz) => (
                  <div key={quiz.question}>
                    <p dangerouslySetInnerHTML={createMarkup(quiz.question)} />
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="answer-select-label">
                        Select answer:
                      </InputLabel>
                      <Select
                        required
                        name="answer"
                        id="answer-select"
                        label="Select answer"
                        value={
                          relatedAnswer(quiz.question, selectedAnswers) || ""
                        }
                        labelId="answer-select-label"
                        onChange={(e) => handleAnswerChange(e, quiz.question)}
                      >
                        {quiz.answers.map((answer) => (
                          <MenuItem key={answer} value={answer}>
                            {answer}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
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
        )}
      </Paper>
    </Container>
  );
};

export default App;
