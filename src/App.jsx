import { useState } from 'react'
import './App.css'

function App() {
  const [questions, setQuestion] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchQuestion = async () => {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    setQuestion(data.data.question);
  };

  const handleButtonClick = () => {
    setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
    fetchQuestion();
  };

  const correctAnswer = (index) => {
    const selectedAnswers = correctAnswers[index];
    setQuestion((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = null;
      return updatedData;
    });
    setCorrectAnswers((prevAnswers) => [...prevAnswers, selectedAnswers]);
  };

  const incorrectAnswer = (index) => {
    const incorrectA = correctAnswers[index];
    setCorrectAnswers((prevAnswers) => {
      const updatedQuestion = [...prevAnswers];
      updatedQuestion.splice(index, 1);
      return updatedQuestion;
    });
    setCountryData((prevData) => {
      const updatedData = [...prevData];
      updatedData.push(incorrectA);
      return updatedData;
    });
  };

  useEffect(() => {
    fetchQuestion()
  }, [correctAnswer, incorrectAnswer]);

  return (
    <>
    <div className="App">

      <header>
        <h1 className="title">Prova</h1>
      </header>

      <main>
        <p>{quest.question}</p>
        <div>
          {question.map((quest, index) => (
            quest && (
              <tr key={index}>
                <td>
                  <button onClick={handleButtonClick}>{quest.correctAnswer}</button>
                </td>
              </tr>
            )
          ))}
          {correctAnswers.map((quest, index) => (
            <tr key={index}>
              <td>
                <button onClick={handleButtonClick}>{quest.incorrectAnswer}</button>
              </td>
            </tr>
          ))}
        </div>
        <div>
          <h2>{currentQuestionIndex}</h2>
        </div>
      </main>

      <footer>
        <h3>Felipe Araújo Monteiro</h3>
      </footer>
    </div>
    </>
  )
}

export default App
