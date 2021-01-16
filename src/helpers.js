export const styles = {
  paper: {
    padding: "20px",
    marginTop: "20px",
    marginBottom: "20px",
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
  question: {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "500",
    lineHeight: "35px",
  },
  answer: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "500",
    lineHeight: "25px",
    marginLeft: "10px",
    display: "flex",
  },
  correctAnswer: {
    color: "green",
  },
  results: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "150px",
    textAlign: "center",
    flexDirection: "column",
  },
};

export const difficulties = [
  { id: "total_easy_question_count", name: "Easy" },
  { id: "total_medium_question_count", name: "Medium" },
  { id: "total_hard_question_count", name: "Hard" },
];

export const createMarkup = (text) => {
  return { __html: text };
};
