import {useWebSocket} from "../Providers/WebSocketProvider";
import {useState} from "react";
import axios from "axios";
import css from '../App.module.css';


type QuestionType = {
  question: {
    question: string,
    answer: string
  }
}

export default () => {
  const [question,setQuestion] = useState<QuestionType>()
  useWebSocket<QuestionType | undefined>((res) => {
    if(!res?.question) return;
    setQuestion(res);
  });

  const openVoting = () => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/sendCommand', {
      command: 'openVoting'
    })
  }
  const correct = () => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/sendCommand', {
      command: 'correct'
    })
  }
  const incorrect = () => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/sendCommand', {
      command: 'incorrect'
    })
  }

  const nextQuestion = () => {
    axios.post('https://4juvlxdwpmd76iwnuu4aeurchy.srv.us/sendCommand', {
      command: 'nextQuestion'
    })
  }

  return (
    <div style={{display: "block"}}>
      <h1>Q: {question?.question?.question }</h1>
      <h1>A: {question?.question?.answer }</h1>
      <p><button className={css.button} onClick={nextQuestion}>Sledece pitanje</button></p>
      <br/>
      <p><button className={css.button} onClick={openVoting}>Otvori javljanje</button></p>
      <br/>
      <p><button className={css.button} onClick={correct}>Tacno</button></p>
      <br/>
      <p><button className={css.button} onClick={incorrect}>Netacno</button></p>
      <br/>
    </div>
    )
}
