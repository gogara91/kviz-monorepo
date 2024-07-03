import css from '../App.module.css';
import {ReactElement, useEffect, useState} from "react";

export const GAME_NAME_SLOVA = 'GAME_NAME_SLOVA';

const allLetters = [ 'b', 'c', 'č', 'ć', 'd', 'Dž', 'đ','f', 'g', 'h','j', 'k', 'l', 'lj',
  'm', 'n', 'nj', 'p', 'r', 's', 'š', 't', 'v', 'z', 'ž', 'a', 'e', 'i',  'o', 'u',]
const sviSuglasnici = [
  'b', 'c', 'č', 'ć', 'd', 'Dž', 'đ','f', 'g', 'h','j', 'k', 'l', 'lj',
  'm', 'n', 'nj', 'p', 'r', 's', 'š', 't', 'v', 'z', 'ž'
];

const sviSamoglasnici = [ 'a', 'e', 'i',  'o', 'u', ]


export const Slova = () => {
  const [gameStarted, setQuizStarted] = useState(false);
  const [letters, setLetters] =  useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] =  useState<number[]>([]);
  const [answer, setAnswer] = useState<number[]>([])
  const [generatedLetters, setGeneratedLetters] = useState<string[]>([]);
  const [randomLetter, setRandomLetter] = useState<string>('');
  const [timerId, setTimerId] = useState<number>(1);

  const generateLetters = () => {
    const brSamoglasnika = Math.random() > 0.4 ? 4 : 3;
    const brSuglasnika = 12 - brSamoglasnika;

    const samoglasnici: string[] = []
    const suglasnici: string[] = []
    for(let i = 0; i < brSamoglasnika; i++) {
      samoglasnici.push(sviSamoglasnici.sort(() => Math.random() - 0.5)[0])
    }
    for(let i = 0; i < brSuglasnika; i++) {
      suglasnici.push(sviSuglasnici.sort(() => Math.random() - 0.5)[0])
    }
    setGeneratedLetters([...samoglasnici,...suglasnici].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    generateLetters();
  }, [])

  useEffect(() => {
    customInterval(letters)
  }, [timerId])

  const customInterval = (letters: string[]) => {
    if (letters.length > 11) return;
    setTimeout(() => {
      console.log('setting lettr')
      setRandomLetter(allLetters.sort(() => Math.random() - 0.5)[0])
      setTimerId(timerId + 1)
    }, 100)
  }



  const getLetter = () => {
    const letter = generatedLetters.sort(() => Math.random() - 0.5).shift()
    if (letter) {
      setLetters([...letters, letter])
    }
  }

  const addToAnswer = (index: number) => {
    if (answer.includes(index)) return;
    setDisabledLetters([...disabledLetters, index])
    setAnswer([...answer, index])
  }

  const resetAnswer = () => {
    setAnswer([]);
    setDisabledLetters([]);
  }

  const newGame = () => {
    setAnswer([]);
    setDisabledLetters([]);
    setLetters([]);
    generateLetters();
    customInterval([])
  }

  const answerButtons: ReactElement[] = []
  const buttons: ReactElement[] = []
  for (let i = 0; i <= 11; i++) {
    buttons.push(
      <button
        className={css.button}
        style={{
          width: 80,
          height: 100,
          fontSize: 55,
          padding: 0,
          background: (disabledLetters.includes(i) && 'gray') ||(letters.length === i && '#9c9de6') || ''
      }}
        onClick={() => addToAnswer(i)}
        disabled={disabledLetters.includes(i)}
      >
        {}
        {(letters[i] && letters[i]) || (letters.length === i && randomLetter) || ''}
      </button>
    )

    answerButtons.push((
      <button
        className={css.button}
        style={{width: 80, height: 100, fontSize: 55, padding: 0}}
      >{letters[answer[i]] ?? ''}</button>
    ))
  }


  return (
    <div
      className={!gameStarted ? css.intro : ''}
      style={gameStarted ? {display: "flex", flexDirection: 'column', flexGrow: 1, justifyContent: 'center'} : {}}
    >
      {!gameStarted ? (
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          <div style={{flexGrow: 1}}>
            <h1>
              Slova
            </h1>
          </div>
          <div style={{flexGrow: 1, display: "flex", justifyContent: "center"}}>
            <button
              className={css.button}
              onClick={() => setQuizStarted(true)
              }>
              start
            </button>
          </div>
        </div>
      ) : (
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
          <div style={{flexGrow: 1, marginBottom: 80, borderRadius: 10, overflow: 'hidden', boxShadow: '5px 5px 0px 1px rgba(0,0,0,0.75)'}}>
            <div style={{width: 1200, height: 400, justifyContent: 'center', display: "flex", alignItems: 'center', background: '#7143bc', padding: 20}}>
              {buttons.map(button => button)}
            </div>
            <div style={{width: 1200, height: 100, justifyContent: 'center', display: "flex", alignItems: 'center', background: '#B9B4C7', color: '#7143bc', padding: 20}}>
              {answerButtons.map(btn => btn)}
            </div>
          </div>
          <div  style={{flexGrow: 1, display: 'flex', justifyContent: "center", height: 55}}>
            {letters.length < 12 ? (
              <button
                onClick={getLetter}
                className={css.button}
              >
                stop
              </button>
            ) : ''}
            {answer.length > 0 ? (
              <>
                <button
                  className={css.button}
                  onClick={resetAnswer}
                >
                  resetuj odgovor
                </button>
                <button
                  className={css.button}
                  onClick={newGame}
                >
                  nova igra
                </button>
              </>
            ) : ''}

          </div>
        </div>
      )}
    </div>
  )
}
