import React, {ReactElement, useState} from 'react';
import css from './App.module.css';
import {WebSocketProvider} from "./Providers/WebSocketProvider";
import Home from "./Screens/home";

  function App() {
  return (
    <WebSocketProvider>
    <div className={css.app}>
      <div className={css.content}>
        <div className={css.currentGameScreen}>
          <Home />
        </div>
        <div className={css.controls}>
        </div>
      </div>
    </div>
    </WebSocketProvider>
  );
}

export default App;
