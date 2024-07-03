import {createRef, useEffect, useRef, useState} from "react";
import css from "../App.module.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useWebSocket} from "../Providers/WebSocketProvider";
import someoneClicked from './metalgearsolid.mp3'
import tick from './tick.mp3'
import wrongAnswer from './wrong-answer-sound-effect.mp3'
import correctAnswer from "./correct-answer-new.mp3";
import axios from "axios";

const questions: Array<{
  question: string,
  fileName: string,
  answer: string,
}> = [
  {
    "fileName": "David Bowie - Rebel Rebel",
    "question": "Naziv pesme i izvodjaca",
    "answer": "David Bowie - Rebel Rebel"
  },
  {
    "fileName": "Jay-Z - 99 Problems",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Jay-Z - 99 Problems"
  },
  {
    "fileName": "Eminem - Just Lose It (Official Music Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Eminem - Just Lose It (Official Music Video)"
  },
  {
    "fileName": "Kansas - Dust in the Wind (Official Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Kansas - Dust in the Wind (Official Video)"
  },
  {
    "fileName": "Halid Beslic - Prvi poljubac - (Audio 2002)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Halid Beslic - Prvi poljubac - (Audio 2002)"
  },
  {
    "fileName": "Katrina And The Waves - Walking On Sunshine (Lyrics)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Katrina And The Waves - Walking On Sunshine (Lyrics)"
  },
  {
    "fileName": "John Denver - Take Me Home, Country Roads (Lyrics)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "John Denver - Take Me Home, Country Roads (Lyrics)"
  },
  {
    "fileName": "The Beatles - Yellow Submarine",
    "question": "Naziv pesme i izvodjaca",
    "answer": "The Beatles - Yellow Submarine"
  },
  {
    "fileName": "Colonia - Za tvoje snene oči (Official Video)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Colonia - Za tvoje snene oči"
  },
  {
    "fileName": "David Guetta - Titanium (Lyrics) ft. Sia",
    "question": "Naziv pesme i izvodjaca",
    "answer": "David Guetta - Titanium (Lyrics) ft. Sia"
  },
  {
    "fileName": "Amy Winehouse - Back To Black",
    "question": "Naziv pesme i izvodjaca",
    "answer": "  Amy Winehouse - Back To Black"
  },
  {
    "fileName": "Bruno Mars - The Lazy Song (Official Music Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Bruno Mars - The Lazy Song (Official Music Video)"
  },
  {
    "fileName": "Lenny Kravitz - Fly Away",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Lenny Kravitz - Fly Away"
  },
  {
    "fileName": "SMAK - Daire - (Audio 1977) [HQ]",
    "question": "Naziv pesme i izvodjaca",
    "answer": "SMAK - Daire - (Audio 1977) [HQ]"
  },
  {
    "fileName": "Y2meta.app - ,,Сини јарко сунце са Косова - Serbian Patriotic Song (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": ",,Сини јарко сунце са Косова - Serbian Patriotic Song (128 kbps)"
  },
  {
    "fileName": "Adele - Rolling In The Deep",
    "question": "Naziv pesme i izvodjaca",
    "answer": "  Adele - Rolling In The Deep"
  },
  {
    "fileName": "Bajaga 442 do Beograda",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Bajaga - 442 do Beograda"
  },
  {
    "fileName": "Severina feat. Ministarke - Uno momento - tekst",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Severina feat. Ministarke - Uno momento - tekst"
  },
  {
    "fileName": "Nikola Rokvic - S kim si me nocas varala - (Audio 2006)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Nikola Rokvić - S kim si me noćas varala"
  },
  {
    "fileName": "Coldplay - A Sky Full Of Stars (Official audio)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Coldplay - A Sky Full Of Stars (Official audio)"
  },
  {
    "fileName": "ABBA - Dancing Queen (Lyrics)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "  ABBA - Dancing Queen (Lyrics)"
  },
  {
    "fileName": "Britney Spears - ...Baby One More Time (Official Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Britney Spears - ...Baby One More Time (Official Video)"
  },
  {
    "fileName": "Riblja Čorba - Kada padne noć - Official Video",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Riblja Čorba - Kada padne noć - Official Video"
  },
  {
    "fileName": "Avicii - Wake Me Up (Official Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "  Avicii - Wake Me Up (Official Video)"
  },
  {
    "fileName": "Billy Joel - Piano Man (Audio)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Billy Joel - Piano Man (Audio)"
  },
  {
    "fileName": "The Cranberries - Zombie (Lyrics)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "The Cranberries - Zombie (Lyrics)"
  },
  {
    "fileName": "Dara Bubamara - Pali mali - (Audio 2007)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Dara Bubamara - Pali mali"
  },
  {
    "fileName": "The Weeknd - Can't Feel My Face (Official Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "The Weeknd - Can't Feel My Face (Official Video)"
  },
  {
    "fileName": "Djordje Balasevic - Sin jedinac - (Audio 1996) HD",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Djordje Balasevic - Sin jedinac"
  },
  {
    "fileName": "Bob Dylan - Like a Rolling Stone (Official Audio)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Bob Dylan - Like a Rolling Stone (Official Audio)"
  },
  {
    "fileName": "50 Cent - Just A Lil Bit (Explicit)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "  50 Cent - Just A Lil Bit (Explicit)"
  },
  {
    "fileName": "Familija - Boli me kita",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Familija - Boli me kita"
  },
  {
    "fileName": "The White Stripes - Seven Nation Army (Official Music Video)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "The White Stripes - Seven Nation Army"
  },
  {
    "fileName": "Hozier - Take Me To Church",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Hozier - Take Me To Church"
  },
  {
    "fileName": "Y2meta.app - Dropkick Murphys - Rose Tattoo (Video) (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Dropkick Murphys - Rose Tattoo (Video) (128 kbps)"
  },
  {
    "fileName": "Neil Diamond - Sweet Caroline (Audio)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Neil Diamond - Sweet Caroline (Audio)"
  },
  {
    "fileName": "Aca Lukas - Nesto protiv bolova - (Audio 2001)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Aca Lukas - Nešto protiv bolova"
  },
  {
    "fileName": "N.W.A. - Straight Outta Compton (Lyrics)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "N.W.A. - Straight Outta Compton (Lyrics)"
  },
  {
    "fileName": "Kid Cudi - Day 'N' Nite (Crookers Remix)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Kid Cudi - Day 'N' Nite (Crookers Remix)"
  },
  {
    "fileName": "Guns N Roses - Sweet Child O Mine (lyrics)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Guns N Roses - Sweet Child O Mine (lyrics)"
  },
  {
    "fileName": "Jana Todorović - 2012 - Lune lune (tekst)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Jana Todorović - Lune lune"
  },
  {
    "fileName": "Dino Merlin & Željko Joksimović - Supermen (Official Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Dino Merlin & Željko Joksimović - Supermen (Official Video)"
  },
  {
    "fileName": "Jami - Cokolada - (Official Video)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Jami - Čokolada"
  },
  {
    "fileName": "Y2meta.app - Magnifico & Ad Libitum - Pukni zoro (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Magnifico & Ad Libitum - Pukni zoro (128 kbps)"
  },
  {
    "fileName": "Ljuba Aličić - Crveno obuci - (Audio 2003)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Ljuba Aličić - Crveno obuci"
  },
  {
    "fileName": "Y2meta.app - Orthodox Celts - Star Of The County Down (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Orthodox Celts - Star Of The County Down (128 kbps)"
  },
  {
    "fileName": "Britney Spears - Toxic (Lyrics)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Britney Spears - Toxic"
  },
  {
    "fileName": "Y2meta.app - Српске патриотске песме - Ко то каже, ко то лаже (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Српске патриотске песме - Ко то каже, ко то лаже (128 kbps)"
  },
  {
    "fileName": "Dubioza Kolektiv - Kazu ",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Dubioza Kolektiv - Kazu "
  },
  {
    "fileName": "Taylor Swift - Shake It Off",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Taylor Swift - Shake It Off"
  },
  {
    "fileName": "Lil Wayne - Lollipop (Official Music Video) ft. Static",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Lil Wayne - Lollipop (Official Music Video) ft. Static"
  },
  {
    "fileName": "Riblja Čorba - Nemoj srećo, nemoj danas - Official Video",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Riblja Čorba - Nemoj srećo, nemoj danas"
  },
  {
    "fileName": "Yu grupa - Dunave (official video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Yu grupa - Dunave (official video)"
  },
  {
    "fileName": "Y2meta.app - Bajaga i Instruktori - Pada vlada - (Audio 2003) (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Bajaga i Instruktori - Pada vlada - (Audio 2003) (128 kbps)"
  },
  {
    "fileName": "Mile Kitic - Sampanjac - (Audio 2006)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Mile Kitić - Šampanjac"
  },
  {
    "fileName": "Ice Cube - It Was A Good Day (Remastered)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Ice Cube - It Was A Good Day"
  },
  {
    "fileName": "Plavi orkestar - Sava tiho teče (tekst)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Plavi orkestar - Sava tiho teče (tekst)"
  },
  {
    "fileName": "Luis Fonsi Despacito (LyricsLyric Video) ft. Daddy Yankee",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Luis Fonsi Despacito (LyricsLyric Video) ft. Daddy Yankee"
  },
  {
    "fileName": "Energija - Snage mi ponestaje - (Audio 1998)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Energija - Snage mi ponestaje"
  },
  {
    "fileName": "Y2meta.app - Baja Mali Knindza - Srpska Atina (AUDIO 2020) (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Baja Mali Knindza - Srpska Atina (AUDIO 2020) (128 kbps)"
  },
  {
    "fileName": "Y2meta.app - Psihomodo Pop - Ja volim samo sebe (Official video) (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Psihomodo Pop - Ja volim samo sebe (Official video) (128 kbps)"
  },
  {
    "fileName": "Gorillaz - Clint Eastwood (Official Video)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Gorillaz - Clint Eastwood (Official Video)"
  },
  {
    "fileName": "Nirvana - Come As You Are",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Nirvana - Come As You Are"
  },
  {
    "fileName": "Lady Gaga, Bradley Cooper - Shallow (Lyrics) (A Star Is Born Soundtrack)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Lady Gaga, Bradley Cooper - Shallow (Lyrics) (A Star Is Born Soundtrack)"
  },
  {
    "fileName": "Vlado Georgiev feat Niggor - Tropski bar - (Official Video)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Vlado Georgiev feat Niggor - Tropski bar"
  },
  {
    "fileName": "Y2meta.app - ALEKSANDRA MLADENOVIC - SAMAR (OFFICIAL VIDEO ALBUM PREDSTAVA 2023) (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "ALEKSANDRA MLADENOVIC - SAMAR (OFFICIAL VIDEO ALBUM PREDSTAVA 2023) (128 kbps)"
  },
  {
    "fileName": "Y2meta.app - GOCI BEND - VOZI ME NA PALE (BN Music Etno - Zvuci Zavicaja - BN TV) (128 kbps)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "GOCI BEND - VOZI ME NA PALE (BN Music Etno - Zvuci Zavicaja - BN TV) (128 kbps)"
  },
  {
    "fileName": "Led Zeppelin - Ramble On (Official Audio)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Led Zeppelin - Ramble On (Official Audio)"
  },
  {
    "fileName": "Red Hot Chili Peppers - Scar Tissue [Official Music Video]",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Red Hot Chili Peppers - Scar Tissue [Official Music Video]"
  },
  {
    "fileName": "Bijelo Dugme - Na zadnjem sjedistu moga auta",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Bijelo Dugme - Na zadnjem sjedištu moga auta"
  },
  {
    "fileName": "Zdravko Colic - Maslinasto zelena - (Audio 1990)",
    "question": "Naziv pesme i izvodjaca",
    "answer": "Zdravko Colic - Maslinasto zelena - (Audio 1990)"
  },
  {
    "fileName": "Bad Copy - Uno Due Tre",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Bad Copy - Uno Due Tre"
  },
  {
    "fileName": "Loreen - Euphoria (Official Audio)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Loreen - Euphoria"
  },
  {
    "fileName": "SASA KOVACEVIC - Moja malena (live concert)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "SAŠA KOVACEVIĆ - Moja malena"
  },
  {
    "fileName": "ACDC - Hells Bells (LyricsHQ)",
    "question": "Naziv izvođača i ime pesme",
    "answer": "ACDC - Hells Bells"
  },
  {
    "fileName": "Ana Nikolic - Romale Romali",
    "question": "Naziv izvođača i ime pesme",
    "answer": "Ana Nikolić - Romale Romali"
  }
];

export const GAME_NAME_MUZICKA_IGRA = 'GAME_NAME_MUZICKA_IGRA'
export const MuzickaIgra = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setQuizStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [votingOpen, setVotingOpen] = useState(true);
  const [firstTeam, setFirstTeam] = useState('')
  const [teamsApplied, setTeamsApplied] = useState<string[]>([])
  const [time, setTime] = useState<number>();
  const player = createRef<AudioPlayer>();

  useWebSocket<{team: string | undefined}>((res) => {
    if (!res.team) return;
    if (votingOpen && !firstTeam.length && !teamsApplied.includes(res.team.toLowerCase())) {
      player?.current?.audio?.current?.pause();
      new Audio(someoneClicked).play();
      setTeamsApplied([...teamsApplied, res.team.toLowerCase()])
      setFirstTeam(res.team)
      setVotingOpen(false)
      setTimer();
    }
  })

  useEffect(() => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/sendAnswer', { question: questions[currentQuestion] });
  }, [currentQuestion])


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

  const answerIncorrect = () => {
    new Audio(wrongAnswer).play()
    player?.current?.audio?.current?.play();
    setShowAnswer(true)
    setVotingOpen(false)
    setFirstTeam('')
  }

  const openVoting = () => {
    new Audio(wrongAnswer).play()
    setVotingOpen(true)
    setFirstTeam('')
    player?.current?.audio?.current?.play();
  }

  const answerCorrect = () => {
    player?.current?.audio?.current?.play();
    new Audio(correctAnswer).play()
    setShowAnswer(true)
    setVotingOpen(false)
    setFirstTeam('')
  }

  const nextQuestion = () => {
    setShowAnswer(false)
    setCurrentQuestion(currentQuestion + 1)
    setVotingOpen(true)
    setFirstTeam('')
    setTeamsApplied([])
    player?.current?.audio?.current?.play();
  }

  const setTimer = () => {
    for(let i = 7; i >= 0; i--) {
      setTimeout(() => {
        setTime(i)
        if (i === 0) {
          new Audio(wrongAnswer).play()
        }
      }, (7-i) * 1000)
    }
  }

  useEffect(() => {
    if (time === 0 || time === undefined) {
      return
    }
    new Audio(tick).play()
  }, [time])


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
              Muzička igra
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
            <div style={{width: 1200, height: 400, justifyContent: 'center', display: "flex", flexWrap: "wrap", alignItems: 'center', background: '#7143bc', padding: 20}}>
              <div style={{flexGrow: 1, width: '100%'}}>
                <p style={{ fontSize: 40, textAlign: 'center', textShadow: '3px 3px 2px rgba(0, 0, 0, 1)'}}>{questions[currentQuestion].question}</p>
              </div>
              <div style={{flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <AudioPlayer
                  ref={player}
                  style={{width: '400px', display: 'none'}}
                  autoPlay
                  src={require(`../Songs/${questions[currentQuestion].fileName}.mp3`)}
                  onPlay={e => console.log("onPlay")}
                  // other props here
                />
              </div>
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
