import diceIcon from "/src/assets/images/icon-dice.svg"
import patternDividerMobile from "/src/assets/images/pattern-divider-mobile.svg"
import patternDividerDesktop from "/src/assets/images/pattern-divider-desktop.svg"

import { useState, useEffect } from "react"

function App() {

  const [isMobile, setIsMobile ] = useState(window.innerWidth < 768);
  const [adviceInfo, setAdviceInfo] = useState();
  const [generatedNumber, setGeneratedNumber] = useState();
  const [rollingAdvice, setRollingAdvice] = useState("");

  useEffect(() => {
    const changeSize = () => {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', changeSize);
    changeSize();

    return () => {
      window.removeEventListener('resize', changeSize)
    }
  }, [])



  const getRandomAdvice = async function() {
    try {
      const res = await fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`);
      const data = await res.json();
      setAdviceInfo(data);

      const fakeAdvice = [
        "No. Non. Nein!",
        "Hao!!!",
        "Mou man tai",
        "Never outshine the master.",
        "Trust no one.",
        "Only dead fish go with the flow.",
        "The right path shall appear in my way. HAO!"
      ];

      let dice = 0;
      const rollingDice = setInterval(() => {
        const randomNumber = (Math.floor(Math.random() * 1000) + 1);
        const randomAdvice = fakeAdvice[Math.floor(Math.random() * fakeAdvice.length)]
        setGeneratedNumber(randomNumber);
        setRollingAdvice(randomAdvice);
        dice++;

        if(dice >= 10) {
          clearInterval(rollingDice);
          setGeneratedNumber(data?.slip?.id)
          setRollingAdvice(data?.slip?.advice)
        }

      }, 100);

    } catch(e) {
      console.error(e);
    }
    

  }

  return (
    <>
      <article className="advice-component">
        <h1 className="advice-number" key={adviceInfo?.slip?.advice}>ADVICE #{generatedNumber !== undefined ? generatedNumber : "117"}</h1>
        <p className="random-advice" key={adviceInfo?.slip?.id}>
          {rollingAdvice !== "" ? rollingAdvice : "It is easy to sit up and take notice, what's difficult is getting up and taking action."}
        </p>
        <img src={isMobile ? patternDividerMobile : patternDividerDesktop} alt="divider" className="divider" />
        <button className="generator-btn" onClick={getRandomAdvice}>
          <img src={diceIcon} alt="a dice" />
        </button>
      </article>
    </>
  )
}

export default App