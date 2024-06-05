import React, { useEffect, useState } from 'react';
import { getVideos } from '../../api';
import '../Html/Html.css';
import accessibility from '../../assets/icon-accessibility.svg';
import incorrect from '../../assets/icon-incorrect.svg';
import correct from '../../assets/icon-correct.svg';
import { Link } from 'react-router-dom';

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

  // Check if quizzes data has been fetched
  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  // Extract HTML quiz data
  const htmlQuiz = quizzes.find(quiz => quiz.title === 'HTML');
  if (!htmlQuiz) {
    return <div>No HTML quiz found</div>;
  }

  // Extract the current question from the HTML quiz
  const currentQuestion = htmlQuiz.questions[currentQuestionIndex];

  // Total number of questions
  const totalQuestions = htmlQuiz.questions.length;

  // Function to move to the next question
  const goToNextQuestion = () => {
    // Check if an option is selected before proceeding
    if (selectedOptionIndex === null) {
      setShowWarning(true); // Show warning message
      return; // Exit function
    }

    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOptionIndex(null); // Reset selected option
    setShowResult(false); // Reset result display
    setAnswered(false); // Reset answered flag
    setShowWarning(false); // Reset warning message
  };

  // Function to handle clicking an option
  const handleOptionClick = (index) => {
    if (!answered) {
      setSelectedOptionIndex(index);
      setShowResult(true);
      setAnswered(true);

      // If the clicked option is the correct answer, increment correctAnswers count
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
      {currentQuestion ? (
        <>
          <div className="question">
            <h3 className='allques'>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
            {/* Render the current question */}
            <h1 className='question-html'>{currentQuestion.question}</h1>
          </div>
          <div className="answers">
            <ul>
              {/* Add click event handler to each option */}
              {currentQuestion.options.map((option, index) => {
                // Determine if the option is the correct answer
                const isCorrect = index === currentQuestion.options.findIndex(opt => opt === currentQuestion.answer);
                // Define option label (A, B, C, D)
                const optionLabel = String.fromCharCode(65 + index); // Convert index to ASCII character code

                return (
                  <li
                    className='ques-box'
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    style={{
                      background: '#fff',
                      borderColor:
                        showResult && selectedOptionIndex === index ?
                          (isCorrect ? '#26D782' : '#EE5454') :
                          (answered && isCorrect ? 'transparent' : 'transparent'),
                      cursor: answered ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <div className='ques-text'>
                    <span
                     style={{
                      color: '#000',
                      background:
                      showResult && selectedOptionIndex === index ?
                        (isCorrect ? '#26D782' : '#EE5454') :
                        (answered && isCorrect ? '#F4F6FA' : '#F4F6FA'),
                        color:
                        showResult && selectedOptionIndex === index ?
                          (isCorrect ? '#ffffff' : '#ffffff') :
                          (answered && isCorrect ? '#000' : '#000'),
                      
                      // background:
                      // (isCorrect ? '#26D782' : '#cf5010'),
                      // color: 
                      // (isCorrect ? '#fff' : '#000000'),
                      
                     
                    }}
                     className='options'>{optionLabel} </span>
                   
                      
                      {option}
                      {showResult && selectedOptionIndex === index && !isCorrect && (
                        <span style={{ marginLeft: '5px', color: 'green' }}></span>
                      )}
                    </div>
                    {answered && isCorrect && (
                      <img
                        src={correct}
                        alt="Correct Icon"
                      />
                    )}

                  </li>
                );
              })}
            </ul>
            {/* Button to move to the next question or show "Good Job!" */}
            {currentQuestionIndex < totalQuestions ? (
              <button className='submit-button' onClick={goToNextQuestion}>
                Submit
              </button>
            ) : (
              <div className='good-job'>
                Good Job! You got {correctAnswers} out of {totalQuestions} correct.
              </div>
            )}
            {/* Warning message */}
            {showWarning && <div className="warning">
              <img src={incorrect} alt="" />
              Please select an option!</div>}
          </div>

        </>
      ) : (
        <div className='good-job'>
          <div className='score'>    Quiz completed <br />
            <strong>You scored...</strong>
          </div>


          <div className='result'>
            <div className="result-container">
              <div className='accessibility'>
                <img src={accessibility} alt="" />
                <Link className='home-link' to='/'><strong>Accessibility</strong></Link>
              </div>
              <div className='correct'> <span className='correct-answer'> <strong>{correctAnswers}</strong> </span> <br />
                out of {totalQuestions}</div>
            </div>
          </div>
          <button className='result-button' onClick={restartGame}>Play Again</button>
        </div>


      )}
    </div>
  );
}

export default Index;