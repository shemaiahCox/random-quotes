import { useEffect, useState, useRef } from "react";

// TODO
  // Optimize: fetch runs after every render 

let initialValue = "If you want you're kids to learn how to think, make them learn code"

function App() {
  const [quote, setQuote] = useState(initialValue)
  const quoteIntervalIdRef = useRef();
  const fadeInIntervalIdRef = useRef();
  const fadeOutIntervalIdRef = useRef(); 
  const dataRef = useRef(null);

  console.log(dataRef.current)


  useEffect(() => {
    const quote = document.getElementById('quote');
    // Get data
    fetch('https://dummyjson.com/quotes')
      .then(res => res.json())
      .then(result => dataRef.current = result.quotes);
    // Set quote interval
    quoteIntervalIdRef.current = setInterval(() =>{
      const randomIndex = Math.floor(Math.random() * 30);
      setQuote(dataRef.current[randomIndex].quote);
    }, 6000)
    // Set fadeOut interval
    fadeOutIntervalIdRef.current = setInterval(() => {
      quote.style.opacity = 0;
    }, 5000)
    // Set fadeIn interval
    fadeInIntervalIdRef.current = setInterval(() => {
      quote.style.opacity = 1;
    }, 6000)

    return () => {
      clearInterval(quoteIntervalIdRef.current)
      clearInterval(fadeInIntervalIdRef.current)
      clearInterval(fadeOutIntervalIdRef.current)
    }
  })

  return (
    <div className="App">
      <div className='quote-container'>
          <div className="logo"></div>
          <h2 id='quote'>{`"${quote}"`}</h2>
      </div>
    </div>
  );
}

export default App;
