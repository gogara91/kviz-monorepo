import React, {ReactElement, useState} from 'react';
import css from './App.module.css';
import {GAME_NAME_INTRO, Intro} from "./Games/Intro";
import {GAME_NAME_KO_ZNA_ZNA, KoZnaZna} from "./Games/KoZnaZna";
import {GAME_NAME_MUZICKA_IGRA, MuzickaIgra} from "./Games/MuzickaIgra";
import {Asocijacije, GAME_NAME_ASOCIJACIJE} from "./Games/Asocijacije";
import {Slova, GAME_NAME_SLOVA} from "./Games/Slova";
import {WebSocketProvider} from "./Providers/WebSocketProvider";

const games: Record<string, ReactElement> = {
  [GAME_NAME_INTRO]: <Intro />,
  [GAME_NAME_SLOVA]: <Slova />,
  [GAME_NAME_KO_ZNA_ZNA]: <KoZnaZna />,
  [GAME_NAME_ASOCIJACIJE]: <Asocijacije />,
  [GAME_NAME_MUZICKA_IGRA]: <MuzickaIgra />,
}

const gameOrder = [
  GAME_NAME_INTRO,
  GAME_NAME_SLOVA,
  GAME_NAME_ASOCIJACIJE,
  GAME_NAME_KO_ZNA_ZNA,
  GAME_NAME_MUZICKA_IGRA,
]

  function App() {
  const [currentGameNumber, setCurrentGameNumber] = useState<number>(0);
  const currentOrderName = gameOrder[currentGameNumber]
  return (
    <WebSocketProvider>
    <div className={css.app}>
      <div className={css.content}>
        <div className={css.currentGameScreen}>
          {games[currentOrderName]}
        </div>
        <div className={css.controls}>
          {currentOrderName === GAME_NAME_INTRO
            ? (
              <button
                className={css.button}
                onClick={() => setCurrentGameNumber(currentGameNumber + 1)}
              >
                start
              </button>
            )
            : (
              <>
                <button
                  className={css.button}
                  onClick={() => setCurrentGameNumber(currentGameNumber - 1)}
                >
                  Prethodna igra
                </button>
                <button
                  className={css.button}
                  onClick={() => setCurrentGameNumber(currentGameNumber + 1)}
                >
                  Sledeca igra
                </button>
              </>
            )
          }
        </div>
      </div>
    </div>
    </WebSocketProvider>
  );
}

export default App;
