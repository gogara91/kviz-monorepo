import React, {ReactElement, useState} from 'react';
import axios from 'axios';
import css from './App.module.css';
import squidward from './squidward-walk-noise.mp3'
import punch from './punch.mp3'
import quack_5 from './quack_5.mp3'
import strongpunch from './strongpunch.mp3'
import slap from './woman-slap.mp3'
import piuw from './piuw.mp3'
import fart from './perfect-fart.mp3'
import meow from './meow-1.mp3'
import marioJump from './maro-jump-sound-effect_1.mp3'
import error from './error_CDOxCYm.mp3'
import ding from './ding-sound-effect_2.mp3'
import chomp from './chomp-1.mp3'
import censor from './censor-beep-1.mp3'
import bruh from './bruh-sound-effect_WstdzdM.mp3'

const sounds = [
  {
    sound: squidward,
    name: 'squidward'
  },
  {
    sound: punch,
    name: 'punch'
  },
  {
    sound: strongpunch,
    name: 'strong punch'
  },
  {
    sound: quack_5,
    name: 'quack'
  },
  {
    sound: slap,
    name: 'slap'
  },
  {
    sound: piuw,
    name: 'piuw'
  },
  {
    sound: fart,
    name: 'fart'
  },
  {
    sound: meow,
    name: 'meow',
  },
  {
    sound: marioJump,
    name: 'marioJump',
  },
  {
    sound: error,
    name: 'error',
  },
  {
    sound: ding,
    name: 'ding',
  },
  {
    sound: chomp,
    name: 'chomp',
  },
  {
    sound: censor,
    name: 'censor',
  },
  {
    sound: bruh,
    name: 'bruh',
  },
]

function App() {
  const [team, setTeam] = useState<string | null>(localStorage.getItem('team'))
  const [inputValue, setInputValue] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [selectedSound, setSelectedSound] = useState<string>(squidward);
  const handleSave = () => {
    setTeam(inputValue)
    localStorage.setItem('team', inputValue)
    setInputValue('');
  }

  const clearTeam = () => {
    setTeam(null);
    localStorage.removeItem('team');
  }

  const chooseSound = (sound:string) => {
    new Audio(sound).play()
    setSelectedSound(sound)
  }

  const submitAnswer = () => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/answer', { team, answer });
    setAnswer('');
  }

  const submitBoing = () => {
    const audio = new Audio(selectedSound)
    audio.play();
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/tap', { team });
  }

  return (
    <div className={css.app}>
      <div className={css.content}>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: "center"}}>
          <div style={{display: 'flex', flexGrow: 1, flexShrink: 0, flexDirection: "column", justifyContent: 'center', gap: 20, alignItems: "center"}}>
            {
              !team ?
                (
                  <>
                    <input
                      className={css.input}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)} placeholder="team name"
                    />
                    <button
                      onClick={handleSave}
                      className={css.button}
                    >
                      save
                    </button>
                  </>
                )
                :
                (
                  <>
                    {/*<input*/}
                    {/*  className={css.input}*/}
                    {/*  value={answer}*/}
                    {/*  onChange={(e) => setAnswer(e.target.value)}*/}
                    {/*  placeholder="answer"*/}
                    {/*/>*/}
                    {/*<button*/}
                    {/*  className={css.button}*/}
                    {/*  onClick={submitAnswer}*/}
                    {/*>submit answer</button>*/}
                    <button
                      style={{height: 250, width: 250, fontSize: 40, marginTop: 20}}
                      className={css.button}
                      onClick={submitBoing}
                    >boing</button>
                    {sounds.map(el => (
                      <button className={css.button} onClick={() => chooseSound(el.sound)}>
                        {el.name}
                      </button>
                    ))}
                    <button
                      style={{marginTop: 200}}
                      onClick={clearTeam}
                      className={css.button}
                    >clear team</button>
                  </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
