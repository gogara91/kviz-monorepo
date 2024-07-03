import css from '../App.module.css';
import {useEffect, useState} from "react";
import {useWebSocket} from "../Providers/WebSocketProvider";
import someoneClicked from "./metalgearsolid.mp3";
import wrongAnswer from "./wrong-answer-sound-effect.mp3";
import correctAnswer from "./correct-answer-new.mp3";
import axios from "axios";
import tick from "./tick.mp3";

export const GAME_NAME_KO_ZNA_ZNA = 'GAME_NAME_KO_ZNA_ZNA';

const questions: Array<{
  question: string,
  answer: string
}> = [
  {
    "question": "Kako se zove najmlađa sestra Majkla Džeksona?",
    "answer": "Dzenet Dzekson"
  },
  {
    "question": "Šta umesto ruku ima filmski junak Edvard, kog glumi Dzoni Dep",
    "answer": "Makaze"
  },
  {
    "question": "Koji je grčki naziv za vađenje ćelija ili tkiva iz pacijenata radi ispitivanja?",
    "answer": "Biopsija"
  },
  {
    "question": "Iz kog španskog grada je košarkaški klub Unikaha",
    "answer": "Malaga"
  },
  {
    "question": "Ministarstvo kulture i ___________________?",
    "answer": "Informisanja"
  },
  {
    "question": "Iz koje zemlje potiče svila?",
    "answer": "Kina"
  },
  {
    "question": "kako skraćeno zovemo Centar za slobodne izbore i demokratiju",
    "answer": "CeSID"
  },
  {
    "question": "Koji je drugi najrasprostranjeniji element na zemlji?",
    "answer": "Silicijum"
  },
  {
    "question": "Koji reper je postao prvi dobitnik Pulicerove nagrade za muziku koji nije klasični ili džez muzičar",
    "answer": "Kendrik Lamar"
  },
  {
    "question": "U kom gradu je potpisan sporazum kojim je okončano NATO bombardovanje 1999. godine?",
    "answer": "Kumanovo"
  },
  {
    "question": "Kada Amerikanci slave dan zahvalnosti?",
    "answer": "Četvrtog četvrtka u novembru"
  },
  {
    "question": "Za koju zemlju je Monika Seleš osvojila olimpijsku bronzu?",
    "answer": "SAD"
  },
  {
    "question": "Kako se Isus zove u Kuranu",
    "answer": "Isa"
  },
  {
    "question": "Koji proizvođač automobila je prvi uveo sigurnosne pojaseve?",
    "answer": "Volvo"
  },
  {
    "question": "S koliko godina je Mocart napisao prvu kompoziciju?",
    "answer": "5 godina"
  },
  {
    "question": "Koje boje je boje bio kip slobode kada je originalno napravljen?",
    "answer": "Braon/crvene, bakar"
  },
  {
    "question": "Koliko dijagonala ima trougao?",
    "answer": "0"
  },
  {
    "question": "U prevodu \"Ceđeni ananas\", koji je omiljeni napitak Del Boja u seriji Mućke",
    "answer": "Pina Colada"
  },
  {
    "question": "Na kom planinskom masivu se nalazi kneževina Andora?",
    "answer": "Pirineji"
  },
  {
    "question": "Iz koje južnoameričke zemlje je izvorna verzija serije Ružna Beti",
    "answer": "Kolumbija"
  },
  {
    "question": "Koje je pravo ime Lejdi Gage?",
    "answer": "Stefani Dzermonta"
  },
  {
    "question": "Koja kopnena životinja je najveći mesožder na svetu?",
    "answer": "Polarni medved"
  },
  {
    "question": "Koji je prvi video ikada pušten na MTV-u?",
    "answer": "Video Killed the Radio Star "
  },
  {
    "question": "Kako se zove lik iz grčke mitologije koji se zaljubio u sopstveni izraz u vodi?",
    "answer": "Narcis"
  },
  {
    "question": "Koja krvna grupa je univerzalni davalac?",
    "answer": "0 negativna"
  },
  {
    "question": "Od koliko republika se sastojala Savezna Republika Jugoslavija",
    "answer": "2"
  },
  {
    "question": "Koliko je godina imala kraljica Elizabeta kada je krunisana?",
    "answer": "27"
  },
  {
    "question": "Šta je crni jastreb u filmu Pad crnog jastreba?",
    "answer": "Helikopter"
  },
  {
    "question": "Po kom antičkom gradu se zove međunarodni aerodrom u Tunisu",
    "answer": "Kartagina"
  },
  {
    "question": "Koju reč nemačkog porekla koristimo za krijumčara?",
    "answer": "Švercer"
  },
  {
    "question": "Koliko približno vremena treba da sunčeva svetlost dođe do Zemlje?",
    "answer": "8 minuta"
  },
  {
    "question": "Kako se zove fiktivni grad u kom se odigrava radnja crtanog filma Aladin",
    "answer": "Agraba"
  },
  {
    "question": "Kako se nazivaju ptice koje se ne sele?",
    "answer": "Ptice stanarice"
  },
  {
    "question": "Koliko mora zapljuskuje Balkansko poluostrvo",
    "answer": "5"
  },
  {
    "question": "Iz kog jezika potiče reč \"partizan\"?",
    "answer": "Iz francuskog"
  },
  {
    "question": "Šta je omiljena hrana mačka Garfilda",
    "answer": "Lazanje"
  },
  {
    "question": "Koliko mesecu treba da obiđe oko Sunca?",
    "answer": "Godinu dana"
  },
  {
    "question": "Čime je naoružana kornjača Mikelandjelo",
    "answer": "Nunčake"
  },
  {
    "question": "Koje godine su Rolling Stones izbacili poslednji album?",
    "answer": "2023."
  },
  {
    "question": "Koja kraljica je poručila narodu \"ako nemate hleba, jedite kolača\"",
    "answer": "Marija Antoneta"
  },
  {
    "question": "Koliko puta se Ros razvodio?",
    "answer": "3 (Kerol, Emili, Rejčel)"
  },
  {
    "question": "Koji dan je Start Wars dan?",
    "answer": "4. maj"
  },
  {
    "question": "Kako se zove glumac koji tumači lik Dr Hausa",
    "answer": "Hju Lori"
  },
  {
    "question": "Kako se zove švedska regija čije ime nosi proizvođač kamiona i autobusa?",
    "answer": "Scania"
  },
  {
    "question": "Koji turcizam koristimo kao sinonim za naočare",
    "answer": "Đozluci "
  },
  {
    "question": "Koji izraz se koristi za ovcu staru of 6 do 12 meseci?",
    "answer": "Šilježe"
  },
  {
    "question": "Koje discipline postoje u trijatlonu?",
    "answer": "Trčanje, plivanje, vožnja bicikla"
  },
  {
    "question": "Kako se zove objekat napravljen od jednog kamena (spomenik, statua, obelsik...)",
    "answer": "Monolit"
  },
  {
    "question": "Koji bend je snimio pesmu za film Flash Gordon",
    "answer": "Queen"
  },
  {
    "question": "Koja država je nazvana po ekvatoru iako ne zahvata njenu teritoriju?",
    "answer": "Ekvatorijalna Gvineja"
  },
  {
    "question": "Kojim sportom se bavio i bio svetski šampion Subotičanin Ervin Katona",
    "answer": "Strongman"
  },
  {
    "question": "Na kom ostrvu u sastavu Danske je najveći nacionalni park na svetu?",
    "answer": "Grenland"
  },
  {
    "question": "Kako se u fizici naziva odnos mase i zapremine tela?",
    "answer": "Gustina"
  },
  {
    "question": "Koji bračni par je za potrebe snimanja spota zatvorio Luvr",
    "answer": "Jay Z i Beyonce"
  },
  {
    "question": "Koja italijanska reč označava treperenje glasa pri pevanju?",
    "answer": "Vibrato"
  },
  {
    "question": "Koji deo ljudskog tela proizvodi krvna zrnca",
    "answer": "Koštana srž"
  },
  {
    "question": "Šta je po državnom uređenju Monako?",
    "answer": "Kneževina"
  },
  {
    "question": "Nicotiana tabacum je?",
    "answer": "Duvan"
  },
  {
    "question": "Koja je najsuvlja pustinja na svetu?",
    "answer": "Atakama"
  },
  {
    "question": "Koji američki reper je dao ime sinu Psalm?",
    "answer": "Kanye West"
  }
]

export const KoZnaZna = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setQuizStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);
  const [firstTeam, setFirstTeam] = useState('')
  const [teamsApplied, setTeamsApplied] = useState<string[]>([])
  const [time, setTime] = useState<number>();

  useWebSocket<{team: string | undefined}>((res) => {
    if (!res.team) return;
    if (votingOpen && !firstTeam.length  && !teamsApplied.includes(res.team.toLowerCase())) {
      new Audio(someoneClicked).play();
      setTeamsApplied([...teamsApplied, res.team.toLowerCase()])
      setFirstTeam(res.team)
      setVotingOpen(false)
      setTimer();
    }
  })

  useWebSocket<{command: string}>((res) => {
    if (!res.command) return;
    if (res.command === 'openVoting')
      openVoting()
    if (res.command === 'correct')
      answerCorrect()
    if (res.command === 'incorrect')
      answerIncorrect()
    if (res.command === 'nextQuestion')
      nextQuestion()
  })

  useEffect(() => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/sendAnswer', { question: questions[currentQuestion] });
  }, [currentQuestion])

  const openVoting = () => {
    firstTeam && new Audio(wrongAnswer).play()
    setVotingOpen(true)
    setFirstTeam('')
  }

  const setTimer = () => {
    for(let i = 7; i >= 0; i--) {

      setTimeout(() => {
        setTime(i)
        if (i === 0) {
          new Audio(wrongAnswer).play()
        }
      }, (5-i) * 1000)
    }
  }

  useEffect(() => {
    if (time === 0 || time === undefined) {
      return
    }
    new Audio(tick).play()
  }, [time])

  const answerCorrect = () => {
    new Audio(correctAnswer).play()
    setShowAnswer(true)
    setVotingOpen(false)
    setFirstTeam('')
  }

  const answerIncorrect = () => {
    new Audio(wrongAnswer).play()
    setShowAnswer(true)
    setVotingOpen(false)
    setFirstTeam('')
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) return;
    setShowAnswer(false)
    setVotingOpen(false)
    setCurrentQuestion(currentQuestion + 1)
    setTeamsApplied([])
  }

  return (
    <div
      className={!gameStarted ? css.intro : ''}
      style={gameStarted ? {display: "flex", flexDirection: 'column', flexGrow: 1, justifyContent: 'center'} : {}}
    >
      {
        !votingOpen && time && time > 0 ? (<div style={{
          position: "fixed",
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '280px',
          background: "rgba(0,0,0,0.5)"
        }}>{time}</div>) : ''
      }
      {!gameStarted ? (
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          <div style={{flexGrow: 1}}>
            <h1>
              ko zna zna
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
          <p style={{fontSize: 20}}>{currentQuestion + 1}/{questions.length}</p>
          <div style={{flexGrow: 1, marginBottom: 80, borderRadius: 10, overflow: 'hidden', boxShadow: '5px 5px 0px 1px rgba(0,0,0,0.75)'}}>
            <div style={{width: 1200, height: 400, justifyContent: 'center', display: "flex", alignItems: 'center', background: '#7143bc', padding: 20}}>
              <p style={{ fontSize: 40, textAlign: 'center', textShadow: '3px 3px 2px rgba(0, 0, 0, 1)'}}>{questions[currentQuestion].question}</p>
            </div>
            <div style={{width: 1200, height: 100, justifyContent: 'center', display: "flex", alignItems: 'center', background: '#B9B4C7', color: '#7143bc', padding: 20}}>
              {firstTeam && (
                <p style={{
                  fontFamily: 'Bangers',
                  fontSize: 100,
                  textAlign: "center",
                  fontWeight: 'bold',
                  textShadow: '3px 3px 2px rgba(0, 0, 0, 1)',
                  color: "green"
                }}>
                  {firstTeam}
                </p>
              )}

              {showAnswer ? (
                <p style={{
                  fontFamily: 'Bangers',
                  fontSize: 60,
                  textAlign: "center",
                  fontWeight: 'bold',
                  textShadow: '3px 3px 2px rgba(0, 0, 0, 1)'
                }}>
                  {questions[currentQuestion].answer}
                </p>
              ) : ''}
            </div>
          </div>
          <div  style={{flexGrow: 1, display: 'flex', justifyContent: "center"}}>
            {
              showAnswer && (currentQuestion + 1) < questions.length ? (
                <button
                  className={css.button}
                  onClick={nextQuestion}
                >
                  sledeće pitanje
                </button>
              ) : ''
            }

            {
              !votingOpen && !showAnswer && (
                <button
                  className={css.button}
                  onClick={openVoting}
                >
                  Otvori javljanje
                </button>
              )
            }
            {
              !showAnswer ? (
                <>
                  <button
                    className={css.button}
                    onClick={answerCorrect}
                  >
                    tačno
                  </button>
                  <button
                    className={css.button}
                    onClick={answerIncorrect}
                  >
                    pogrešno
                  </button>
                </>
              ) : ''
            }
          </div>
        </div>
      )}
    </div>
  )
}
