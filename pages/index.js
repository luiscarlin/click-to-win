import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import shuffle from 'lodash/shuffle'


const CHALLENGES = ["flip a bottle on the arm of the couch", "five bottle flips in a row", "flip a bottle cap", "flip a bottle on the floor", "ping pong shot into a cup", "roll a 4 with a die", "roll a 6 with a die"]

export default function Home() {

  const [playerOneName, setPlayerOneName] = useState('')
  const [playerTwoName, setPlayerTwoName] = useState('')
  const [gameState, setGameState] = useState("NOT_STARTED")
  const [playerOneCurrentChallenge, setPlayerOneCurrentChallenge] = useState(0)
  const [playerTwoCurrentChallenge, setPlayerTwoCurrentChallenge] = useState(0)
  const [winner, setWinner] = useState('')

  const [challengeList, setChallengeList] = useState(CHALLENGES)
  

  const startGame = () => {
    setGameState("STARTED")
    setChallengeList(shuffle(challengeList).slice(0, 3))
    setPlayerOneCurrentChallenge(0)
    setPlayerTwoCurrentChallenge(0)
  }

  const winnerFound = () => {
    setGameState("FINISHED")
  }


  const doneWithChallenge = (playerName, currentChallenge, setter) => {
    if (currentChallenge === challengeList.length - 1) {
      winnerFound()
      setWinner(playerName)
    }
    else {
      setter(currentChallenge + 1)
    }

  }


  return (
    <div className={styles.container}>

      <Head>
        <title>Click to win</title>
        <meta name="description" content="click to win" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  

      <main className={styles.main}>
        {gameState === "NOT_STARTED" && <> 
        
        <h1>Players</h1>
        <input value={playerOneName} placeholder="enter name" onChange={e => setPlayerOneName(e.target.value)}/>
        <input value={playerTwoName} placeholder="enter name" onChange={e => setPlayerTwoName(e.target.value)}/>
        <button onClick={startGame}>Start</button>
        </>
        }

        {gameState === "STARTED" && <> 
        <div>
           {challengeList.map((challenge, i) => <div key={i}>
            <h1>{challenge}</h1>
            {i === playerOneCurrentChallenge && <div><p>{playerOneName}</p><button onClick={() => doneWithChallenge(playerOneName, i, setPlayerOneCurrentChallenge)}>done</button></div>}
            {i === playerTwoCurrentChallenge && <div><p>{playerTwoName}</p><button onClick={() => doneWithChallenge(playerTwoName, i, setPlayerTwoCurrentChallenge)}>done</button></div>}
            </div>)}
        </div>
        
        </>
        }
        {
          gameState=== "FINISHED" && <h1>{winner} WON!!!!</h1>
        }

      </main>
    </div>
  )
}
