import React, { useEffect, useState } from 'react';
import { getVideos } from '../../api';
import '../Html/Html.css';
import Answers from '../../logic/Answers';
import accessibility from '../../assets/icon-accessibility.svg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';


function Index() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVideos();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  const htmlQuiz = quizzes.find(quiz => quiz.title === 'CSS');
  if (!htmlQuiz) {
    return <div>No HTML quiz found</div>;
  }

  const currentQuestion = htmlQuiz.questions[currentQuestionIndex];
  const totalQuestions = htmlQuiz.questions.length;

  const goToNextQuestion = () => {
    if (selectedOptionIndex === null) {
      setShowWarning(true);
      return;
    }

    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOptionIndex(null);
    setShowResult(false);
    setAnswered(false);
    setShowWarning(false);
  };

  const handleOptionClick = (index) => {
    if (!answered) {
      setSelectedOptionIndex(index);
      setShowResult(true);
      setAnswered(true);

      if (index === currentQuestion.options.findIndex(opt => opt === currentQuestion.answer)) {
        setCorrectAnswers(prevCount => prevCount + 1);
      }
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setShowResult(false);
    setAnswered(false);
    setCorrectAnswers(0);
    setShowWarning(false);
  };

  return (
    <div className='html-container'>
      <Navbar />
      <div className='html-container'>
        {currentQuestion ? (
          <Answers
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            selectedOptionIndex={selectedOptionIndex}
            showResult={showResult}
            answered={answered}
            correctAnswers={correctAnswers}
            handleOptionClick={handleOptionClick}
            goToNextQuestion={goToNextQuestion}
            totalQuestions={totalQuestions}
            showWarning={showWarning}
          />
        ) : (
          <div className='good-job'>
            <div className='score'>Quiz completed<br />
              <strong>You scored...</strong>
            </div>
            <div className='result'>
              <div className="result-container">
                <div className='accessibility'>
                  <img src={accessibility} alt="" />
                  <Link className='home-link' to='/'><strong>Accessibility</strong></Link>
                </div>
                <div className='correct'><span className='correct-answer'><strong>{correctAnswers}</strong></span><br />
                  out of {totalQuestions}</div>
              </div>
            </div>
            <button className='result-button' onClick={restartGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
