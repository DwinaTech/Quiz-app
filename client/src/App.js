import {
  Grid,
  Input,
  Select,
  Button,
  MenuItem,
  Container,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useState, useEffect } from "react";
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

const App = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });

  const [quizNumber, setQuizNumber] = useState(0);
  const [answerType, setAnswerType] = useState("");
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });

  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${category.id}&difficulty=${difficulty.name}&type=${answerType}`;
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

  const handleAnswerTypeChange = (e) => {
    e.preventDefault();
    setAnswerType(e.target.value);
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
      <h1>Quiz App:</h1>
      {!quizData || !quizData.length ? (
        <form onSubmit={handleSubmit}>
          {" "}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">
                  Select category:
                </InputLabel>
                <Select
                  required
                  name="category"
                  id="category-select"
                  value={category.id}
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
              <FormControl fullWidth>
                <InputLabel id="difficulty-select-label">
                  Select Difficulty:
                </InputLabel>
                <Select
                  required
                  name="difficulty"
                  id="difficulty-select"
                  value={difficulty.id}
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
              <FormControl fullWidth>
                <InputLabel id="answer-type-select-label">
                  Select type:
                </InputLabel>
                <Select
                  required
                  name="answer-type"
                  id="answer-type-select"
                  value={answerType}
                  labelId="answer-type-select-label"
                  onChange={handleAnswerTypeChange}
                >
                  {answersTypeData.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Input
                inputProps={{ min: 1, max: 10 }}
                required
                fullWidth
                type="number"
                id="quiz-number"
                name="quiz-number"
                label={`Add a quiz number from 1 to 10`}
                value={quizNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" size="medium" variant="contained">
            Submit
          </Button>
        </form>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {quizData.map((quiz) => (
              <div key={quiz.question}>
                <p dangerouslySetInnerHTML={createMarkup(quiz.question)} />
                <FormControl fullWidth>
                  <InputLabel id="answer-select-label">
                    Select answer:
                  </InputLabel>
                  <Select
                    required
                    name="answer"
                    id="answer-select"
                    value={relatedAnswer(quiz.question, selectedAnswers) || ""}
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
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default App;
