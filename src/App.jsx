import { useState, useEffect, useRef } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FaRegLightbulb } from 'react-icons/fa'
import Questions from './preguntas'
import '../src/index.css'

function App() {
  const [actualQuestion, setActualQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(20);
  const [areDisabled, setAreDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSubmit = (correct, e) => {
    //Set scores
    if (correct) {
      setScore(score + 1);
      setIsCorrect(true);
    }
    //Add styles if is correct or incorrect answer
    e.target.classList.add(correct ? 'correct' : 'incorrect');
    //Cambiar a la siguiente pregunta
    setTimeout(() => {
      e.target.classList.remove(correct ? 'correct' : 'incorrect');
    }, 2000);
    setTimeout(() => {
      setAreDisabled(true);
    }, 500);
  }

  const handleChangeQuestion = () => {
    setTiempoRestante(20);
    setAreDisabled(false);
    if (actualQuestion === Questions.length - 1) {
      setFinished(true);
    } else {
      setActualQuestion(actualQuestion + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [tiempoRestante])


  if (isFinished) return (
    <>
      <main className='app bg-gradient-to-r from-slate-200 to-violet-200'>
        <div className='game-over flex flex-col'>
          <span className='font-bold text-xl'> Está es tu puntuación: </span>
          <span className='font-extrabold pt-4 pb-4 text-6xl text-center'>{score}</span>
          <span className='font-bold text-xl text-center'> de {Questions.length} posibles</span>
          <button className='flex flex-row items-center gap-2 font-bold mt-4 text-center justify-center text-white bg-purple-900 p-4 rounded-2xl ease-in-out duration-300 hover:scale-105' onClick={() => (window.location.href = '/')}>
            Volver a jugar
          </button>
        </div>
      </main>
    </>
  )

  return (
    <>
      <main className='app bg-gradient-to-r from-slate-200 to-violet-200'>
        <div className='container'>
          <div className='pregunta pt-6'>
            <span className='text-xl'> Pregunta {actualQuestion + 1} de <strong> {Questions.length} </strong></span>
            <div className="titulo">
              <h2 className='font-sans font-bold text-2xl'>{Questions[actualQuestion].title}</h2>
            </div>
          </div>
          <div className='respuestas'>
            <div className="grid gap-4 grid-cols-2 grid-rows-2 font-bold text-3xl lg:text-4xl text-purple-900 font-sans">
              {
                Questions[actualQuestion].options.map((answer, index) => (
                  <button disabled={areDisabled} onClick={(e) => handleAnswerSubmit(answer.correct, e)} key={index} className='bg-purple-300 p-8 rounded-2xl ease-in-out duration-300 hover:scale-105 disabled:opacity-50 text-center hover:disabled:scale-100'>{answer.answer}</button>
                ))
              }
            </div>
          </div>
          <div className='explication'>
            {
              areDisabled ?
                <div className={`rounded-3xl answer-and-explication flex flex-row items-top md:items-center justify-center gap-4 p-4 border-neutral-200 border-4 h-40 lg:h-auto overflow-y-auto ${isCorrect ? 'bg-lime-200 border-lime-700' : 'bg-rose-300 border-rose-700'}`}>
                  <span className={`${isCorrect ? 'text-lime-700' : 'text-rose-800'}`}>
                    <FaRegLightbulb size={'2rem'} />
                  </span>
                  <p className={`font-medium ${isCorrect ? 'text-lime-700' : 'text-rose-800'}`}>
                    {
                      Questions[actualQuestion].explication
                    }
                  </p>
                </div>
                :
                <div></div>
            }
          </div>
          <div className='next-question'>
            {!areDisabled ? (
              <span className='font-normal text-red-400 text-2xl'>Tiempo restante: <strong className='text-red-600'>{tiempoRestante}</strong>
              </span>
            ) : (
              <span className='font-medium text-black text-2xl'>
                Continua a la siguiente pregunta.
              </span>
            )}
            {
              actualQuestion < 10 &&
              <button onClick={handleChangeQuestion} className='flex flex-row items-center justify-center gap-2 font-bold text-white bg-purple-900 p-4 rounded-2xl ease-in-out duration-300 hover:scale-105'> <p> NEXT QUESTION </p>  <span> <AiOutlineArrowRight /> </span> </button>
            }
            {
              actualQuestion > 10 &&
              <button onClick={handleChangeQuestion} className='bg-purple-400 p-8 rounded-2xl ease-in-out duration-300 hover:scale-105'> SEE YOUR SCORE 🙌 </button>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
