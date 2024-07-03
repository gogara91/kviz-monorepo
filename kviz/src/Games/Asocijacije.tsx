import css from '../App.module.css';
import {useState} from "react";
import {AsocijacijeComp} from "../Components/AsocijacijeComp";

const asocijacije = [
  {
    A1: 'Salata',
    A2: 'Car',
    A3: 'Rulet',
    A4: 'Hrt',
    A: 'Rusija',
    B1: 'Voz',
    B2: 'Igla',
    B3: 'Para',
    B4: 'Zvižduk',
    B: 'Lokomotiva',
    C1: 'Teritorija',
    C2: 'Predeo',
    C3: 'Znanje',
    C4: 'Regija',
    C: 'Oblast',
    D1: 'Soba',
    D2: 'Lanac',
    D3: 'Peškir',
    D4: 'Kalifornija',
    D: 'Hotel',
    final: 'Moskva',
  },
  {
    A1: 'Ljubav',
    A2: 'Pesma',
    A3: 'Plitka',
    A4: 'Epska',
    A: 'Poezija',
    B1: 'Svet',
    B2: 'Leva',
    B3: 'Desna',
    B4: 'Naslov',
    B: 'Strana',
    C1: 'Prvi',
    C2: 'Doživljaj',
    C3: 'Impresija',
    C4: 'Dojam',
    C: 'Utisak',
    D1: 'Ljuba',
    D2: 'Insekt',
    D3: 'Odeća',
    D4: 'Kuhinja',
    D: 'Moljac',
    final: 'Knjiga',
  },
  {
    A1: 'Farba',
    A2: 'Zelena',
    A3: 'Crvena',
    A4: 'Bela',
    A: 'Boja',
    B1: 'Bakar',
    B2: 'Ograda',
    B3: 'Violina',
    B4: 'Gitara',
    B: 'Žica',
    C1: 'Ustav',
    C2: 'Krivica',
    C3: 'Fakultet',
    C4: 'Služba',
    C: 'Pravo',
    D1: 'Veselje',
    D2: 'Pozorište',
    D3: 'Muzika',
    D4: 'Banka',
    D: 'Narod',
    final: 'Glas',
  },
]

export const GAME_NAME_ASOCIJACIJE = 'GAME_NAME_ASOCIJACIJE';

export const Asocijacije = () => {
  const [gameStarted, setQuizStarted] = useState(false);
  const [currGame, setCurrGame] = useState(0);
  const A1 = asocijacije[currGame].A1
  const A2 = asocijacije[currGame].A2
  const A3 = asocijacije[currGame].A3
  const A4 = asocijacije[currGame].A4
  const A = asocijacije[currGame].A
  const B1 = asocijacije[currGame].B1
  const B2 = asocijacije[currGame].B2
  const B3 = asocijacije[currGame].B3
  const B4 = asocijacije[currGame].B4
  const B = asocijacije[currGame].B
  const C1 = asocijacije[currGame].C1
  const C2 = asocijacije[currGame].C2
  const C3 = asocijacije[currGame].C3
  const C4 = asocijacije[currGame].C4
  const C = asocijacije[currGame].C
  const D1 = asocijacije[currGame].D1
  const D2 = asocijacije[currGame].D2
  const D3 = asocijacije[currGame].D3
  const D4 = asocijacije[currGame].D4
  const D = asocijacije[currGame].D
  const final = asocijacije[currGame].final


  return (
    <div
      className={!gameStarted ? css.intro : ''}
      style={gameStarted ? {display: "flex", flexDirection: 'column', flexGrow: 1, justifyContent: 'center'} : {}}
    >
      {!gameStarted ? (
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          <div style={{flexGrow: 1}}>
            <h1>
              Asocijacije
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
          <div  style={{flexGrow: 1, display: 'flex', justifyContent: "center"}}>
            <AsocijacijeComp
              currGame={currGame}
              A1={A1}
              A2={A2}
              A3={A3}
              A4={A4}
              A={A}
              B1={B1}
              B2={B2}
              B3={B3}
              B4={B4}
              B={B}
              C1={C1}
              C2={C2}
              C3={C3}
              C4={C4}
              C={C}
              D1={D1}
              D2={D2}
              D3={D3}
              D4={D4}
              D={D}
              final={final}
            />
          </div>
          <div>
            {
              asocijacije.length > (currGame+1)
                ? (
                  <button onClick={() => setCurrGame(currGame+1)} className={css.button} style={{marginTop: '15px'}}>
                    Sledeća asocijacija
                  </button>
                )
                : ''
            }
          </div>
        </div>
      )}
    </div>
  )
}
