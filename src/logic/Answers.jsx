import React from 'react';
import incorrect from '../assets/icon-incorrect.svg';
import correct from '../assets/icon-correct.svg';


function Answers({
  currentQuestion,
  currentQuestionIndex,
  selectedOptionIndex,
  showResult,
  answered,
  correctAnswers,
  handleOptionClick,
  goToNextQuestion,
  totalQuestions,
  showWarning
}) {
  return (
    <>
       <div className="question">
        <h3 className='allques'>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
        <h1 className='question-html'>{currentQuestion.question}</h1>
      </div>
      <div className="answers">
        <ul>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.options.findIndex(opt => opt === currentQuestion.answer);
            const optionLabel = String.fromCharCode(65 + index);

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
                          (answered && isCorrect ? '#000' : '#000')
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
        {currentQuestionIndex < totalQuestions ? (
    
        <button className='submit-button' onClick={goToNextQuestion}>
        Submit
      </button>
        ) : (
         
          <div className='good-job'>
          Good Job! You got {correctAnswers} out of {totalQuestions} correct.
        </div>
        )}
        {showWarning && <div className="warning">
          <img src={incorrect} alt="" />
          Please select an option!
        </div>}
      </div>
    </>
  );
}

export default Answers;
