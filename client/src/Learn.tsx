import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Notification from "./components/Notification";

interface Group {
  id: number;
  name: string;
  description: string;
  level: number;
  duration: string;
  imageUrl: string;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
}

export interface Question {
  id: number;
  question: string;
  groupId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Answer {
  id: number;
  name: string;
  true: boolean;
  questionId: number;
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
}

interface LearnProps {
  user: User | null;
}

const Learn = ({ user }: LearnProps) => {
  const { id } = useParams();
  const hasSavedRef = useRef(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  let type, proficiency;

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/groups/${id}`);
        setGroup(res.data);
      } catch (err) {
        console.error("Failed to fetch group", err);
      }
    };

    fetchGroup();
  }, [id]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (group?.id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/questions?groupId=${group.id}`);
          const questionsWithAnswers = await Promise.all(
            res.data.map(async (question: Question) => {
              const answersRes = await axios.get(`http://localhost:5000/api/answers?questionId=${question.id}`);
              return { ...question, answers: answersRes.data };
            })
          );
          setQuestions(questionsWithAnswers);
        } catch (err) {
          console.error("Failed to fetch questions and answers", err);
        }
      }
    };

    if (group) {
      fetchQuestions();
    }
  }, [group]);

  useEffect(() => {
    if (isCompleted && user && group) {
      const correct = userAnswers.filter(ans => ans).length;
      const total = userAnswers.length;
  
      axios.post("http://localhost:5000/api/completions", {
        userId: user.id,
        groupId: group.id,
        score: correct,
        total: total,
      }).catch(err => console.error("Failed to save completion", err));
    }
  }, [isCompleted]);

  const handleAnswerClick = (answer: Answer) => {
    if (isCompleted || hasSavedRef.current) return;
  
    const isCorrect = answer.true;
    const updatedAnswers = [...userAnswers, isCorrect];
    setUserAnswers(updatedAnswers);
  
    const nextIndex = currentQuestionIndex + 1;
  
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowQuiz(false);
      setIsCompleted(true);
  
      // Only send the API request here, when the quiz ends
      if (user && group) {
        const correct = updatedAnswers.filter(ans => ans).length;
        const total = updatedAnswers.length;
  
        // Send completion results
        axios.post("http://localhost:5000/api/completions", {
          userId: user.id,
          groupId: group.id,
          score: correct,
          total: total,
        })
        .then(() => {
          hasSavedRef.current = true; // Ensure the post request is not sent again
        })
        .catch(err => console.error("Failed to save completion", err));
      }
    }
  };
  
  

  if (!group) return <p>Loading...</p>;

  switch (group.level) {
    case 1:
      type = "Basic";
      proficiency = "A1-A2";
      break;
    case 2:
      type = "Independent";
      proficiency = "B1-B2";
      break;
  }

  const currentQuestion = questions[currentQuestionIndex];

  let content;

  if (showQuiz && !isCompleted) {
    content = (
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xl w-full text-center">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="grid gap-2">
          {currentQuestion.answers?.map((answer, idx) => (
            <button
              key={idx}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleAnswerClick(answer)}
            >
              {answer.name}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (isCompleted) {
    content = (
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xl w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="mb-4">
          You got {userAnswers.filter(correct => correct).length} out of {questions.length} correct.
        </p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setShowQuiz(true); // Ensure quiz is shown again
            setIsCompleted(false);
            hasSavedRef.current = false; // Reset the flag for new attempt
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          🔁 Retry Quiz
        </button>
      </div>
    );
  } else {
    content = (
      <button
        onClick={() => setShowQuiz(true)}
        className="bg-white text-black px-6 py-3 rounded-xl text-lg font-bold cursor-pointer"
      >
        ▶ Start Quiz
      </button>
    );
  }


  return (
    <>
      <h1 className="text-3xl font-bold bg-white z-10 relative p-5 max-w-screen-lg mx-auto">
        Learn English
      </h1>
      <div
        className="max-w-screen-lg mx-auto relative flex justify-center items-center cursor-pointer"
        id="quiz-card"
      >
        <div className="relative h-130 w-full">
          <img
            src={group.imageUrl}
            alt="Group Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
            {content}
          </div>
        </div>
      </div>

      <header className="max-w-screen-lg mx-auto">
        <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
          <div>
            <div className="text-lg">{type}</div>
            <div className="text-4xl font-semibold">{group.name}</div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between text-gray-500 text-xl">
          <span>{proficiency}</span>
          <span>{group.duration}</span>
        </div>
        <div className="p-4 text-gray-700 border-b border-gray-200">
          {group.description}
        </div>
      </header>

      {!user ? (
        <Notification type="danger" message="Not logged in, progress will not be saved" />
      ) : (
        ""
      )}
    </>
  );
};

export default Learn;
