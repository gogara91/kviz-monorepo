import css from "../App.module.css";
import {useEffect, useState} from "react";

export const AsocijacijeComp = ({
  currGame,
  A1,
  A2,
  A3,
  A4,
  A,
  B1,
  B2,
  B3,
  B4,
  B,
  C1,
  C2,
  C3,
  C4,
  C,
  D1,
  D2,
  D3,
  D4,
  D,
  final,
}: {
  currGame: number,
  A1: string,
  A2: string,
  A3: string,
  A4: string,
  A: string,
  B1: string,
  B2: string,
  B3: string,
  B4: string,
  B: string,
  C1: string,
  C2: string,
  C3: string,
  C4: string,
  C: string,
  D1: string,
  D2: string,
  D3: string,
  D4: string,
  D: string,
  final: string,
}) => {
  const [A1Open, setA1Open] = useState(false)
  const [A2Open, setA2Open] = useState(false)
  const [A3Open, setA3Open] = useState(false)
  const [A4Open, setA4Open] = useState(false)
  const [ASolved, setASolved] = useState(false)

  const [B1Open, setB1Open] = useState(false)
  const [B2Open, setB2Open] = useState(false)
  const [B3Open, setB3Open] = useState(false)
  const [B4Open, setB4Open] = useState(false)
  const [BSolved, setBSolved] = useState(false)

  const [C1Open, setC1Open] = useState(false)
  const [C2Open, setC2Open] = useState(false)
  const [C3Open, setC3Open] = useState(false)
  const [C4Open, setC4Open] = useState(false)
  const [CSolved, setCSolved] = useState(false)

  const [D1Open, setD1Open] = useState(false)
  const [D2Open, setD2Open] = useState(false)
  const [D3Open, setD3Open] = useState(false)
  const [D4Open, setD4Open] = useState(false)
  const [DSolved, setDSolved] = useState(false)

  const [finalSolved, setFinalSolved] = useState(false)

  const resolveACol = () => {
    setA1Open(true);
    setA2Open(true);
    setA3Open(true);
    setA4Open(true);
    setASolved(true);
  }

  const resolveBCol = () => {
    setB1Open(true);
    setB2Open(true);
    setB3Open(true);
    setB4Open(true);
    setBSolved(true);
  }
  const resolveCCol = () => {
    setC1Open(true);
    setC2Open(true);
    setC3Open(true);
    setC4Open(true);
    setCSolved(true);
  }
  const resolveDCol = () => {
    setD1Open(true);
    setD2Open(true);
    setD3Open(true);
    setD4Open(true);
    setDSolved(true);
  }

  const resolveFinal = () => {
    resolveACol()
    resolveBCol()
    resolveCCol()
    resolveDCol()
    setFinalSolved(true)
  }

  useEffect(() => {
    setA1Open(false)
    setA2Open(false)
    setA3Open(false)
    setA4Open(false)
    setASolved(false)
    setB1Open(false)
    setB2Open(false)
    setB3Open(false)
    setB4Open(false)
    setBSolved(false)
    setC1Open(false)
    setC2Open(false)
    setC3Open(false)
    setC4Open(false)
    setCSolved(false)
    setD1Open(false)
    setD2Open(false)
    setD3Open(false)
    setD4Open(false)
    setDSolved(false)
    setFinalSolved(false)
  }, [currGame])

  return (
    <div className={css.asocijacije}>
      <div className={css.colsContainer}>
        <div className={css.column}>
          <div onClick={() => setA1Open(true)} className={`${A1Open ? css.open : ''} ${ ASolved ? css.solved : ''}`}>{A1Open ? A1 : 'A1'}</div>
          <div onClick={() => setA2Open(true)} className={`${A2Open ? css.open : ''} ${ ASolved ? css.solved : ''}`}>{A2Open ? A2 : 'A2'}</div>
          <div onClick={() => setA3Open(true)} className={`${A3Open ? css.open : ''} ${ ASolved ? css.solved : ''}`}>{A3Open ? A3 : 'A3'}</div>
          <div onClick={() => setA4Open(true)} className={`${A4Open ? css.open : ''} ${ ASolved ? css.solved : ''}`}>{A4Open ? A4 : 'A4'}</div>
          <div onClick={resolveACol} className={`${ASolved ? css.solved : ''}`}>{ASolved ? A : 'A'}</div>
        </div>
        <div className={css.column}>
          <div onClick={() => setB1Open(true)} className={`${B1Open ? css.open : ''} ${ BSolved ? css.solved : ''}`}>{B1Open ? B1 : 'B1'}</div>
          <div onClick={() => setB2Open(true)} className={`${B2Open ? css.open : ''} ${ BSolved ? css.solved : ''}`}>{B2Open ? B2 : 'B2'}</div>
          <div onClick={() => setB3Open(true)} className={`${B3Open ? css.open : ''} ${ BSolved ? css.solved : ''}`}>{B3Open ? B3 : 'B3'}</div>
          <div onClick={() => setB4Open(true)} className={`${B4Open ? css.open : ''} ${ BSolved ? css.solved : ''}`}>{B4Open ? B4 : 'B4'}</div>
          <div onClick={resolveBCol} className={`${BSolved ? css.solved : ''}`}>{BSolved ? B : 'B'}</div>
        </div>
      </div>
      <div className={css.colsContainer}>
        <div className={`${css.column} ${css.finalCol}`}>
          <div onClick={resolveFinal} className={`${css.final} ${finalSolved ? css.solved : ''}`}>{finalSolved ? final : 'Konacno Resenje'}</div>
        </div>
      </div>
      <div className={css.colsContainer}>
        <div className={css.column}>
          <div onClick={resolveCCol} className={`${CSolved ? css.solved : ''}`}>{CSolved ? C : 'C'}</div>
          <div onClick={() => setC4Open(true)} className={`${C4Open ? css.open : ''} ${ CSolved ? css.solved : ''}`}>{C4Open ? C4 : 'C4'}</div>
          <div onClick={() => setC3Open(true)} className={`${C3Open ? css.open : ''} ${ CSolved ? css.solved : ''}`}>{C3Open ? C3 : 'C3'}</div>
          <div onClick={() => setC2Open(true)} className={`${C2Open ? css.open : ''} ${ CSolved ? css.solved : ''}`}>{C2Open ? C2 : 'C2'}</div>
          <div onClick={() => setC1Open(true)} className={`${C1Open ? css.open : ''} ${ CSolved ? css.solved : ''}`}>{C1Open ? C1 : 'C1'}</div>
        </div>
        <div className={css.column}>
          <div onClick={resolveDCol} className={`${DSolved ? css.solved : ''}`}>{DSolved ? D : 'D'}</div>
          <div onClick={() => setD4Open(true)} className={`${D4Open ? css.open : ''} ${ DSolved ? css.solved : ''}`}>{D4Open ? D4 : 'D4'}</div>
          <div onClick={() => setD3Open(true)} className={`${D3Open ? css.open : ''} ${ DSolved ? css.solved : ''}`}>{D3Open ? D3 : 'D3'}</div>
          <div onClick={() => setD2Open(true)} className={`${D2Open ? css.open : ''} ${ DSolved ? css.solved : ''}`}>{D2Open ? D2 : 'D2'}</div>
          <div onClick={() => setD1Open(true)} className={`${D1Open ? css.open : ''} ${ DSolved ? css.solved : ''}`}>{D1Open ? D1 : 'D1'}</div>
        </div>
      </div>
    </div>
  )
}
