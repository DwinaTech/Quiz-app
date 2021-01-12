export const styles = {
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

export const difficulties = [
  { id: "total_easy_question_count", name: "Easy" },
  { id: "total_medium_question_count", name: "Medium" },
  { id: "total_hard_question_count", name: "Hard" },
];

export const answersTypeData = [
  { id: "multiple", name: "Multiple" },
  { id: "boolean", name: "True / False" },
];
