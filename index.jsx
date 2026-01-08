// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Learn from './pages/Learn';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  );
}

// src/pages/Home.jsx
import React from 'react';
import CipherTool from '../components/CipherTool';
import HistorySection from '../components/HistorySection';

export default function Home() {
  return (
    <div className="p-4 space-y-10">
      <HistorySection />
      <CipherTool />
    </div>
  );
}

// src/pages/Game.jsx
import React from 'react';
import GameMode from '../components/GameMode';

export default function Game() {
  return (
    <div className="p-4">
      <GameMode />
    </div>
  );
}

// src/pages/Learn.jsx
import React from 'react';
import LearnMorePage from '../components/LearnMorePage';

export default function Learn() {
  return (
    <div className="p-4">
      <LearnMorePage />
    </div>
  );
}

// src/components/HistorySection.jsx
import React from 'react';

export default function HistorySection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">History of the Caesar Cipher</h2>
      <p>
        The Caesar Cipher, named after Julius Caesar who reportedly used it to communicate with his generals,
        is a simple substitution cipher where each letter in the plaintext is shifted a certain number of
        places down or up the alphabet.
      </p>
      <p>
        For example, with a shift of 3, A becomes D, B becomes E, and so on. It was one of the earliest known
        and simplest forms of encryption.
      </p>
    </section>
  );
}

// src/components/CipherTool.jsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function CipherTool() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [encoded, setEncoded] = useState('');

  const caesarCipher = (str, shiftAmount) => {
    return str.replace(/[a-z]/gi, (char) => {
      const base = char >= 'a' && char <= 'z' ? 97 : 65;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shiftAmount + 26) % 26) + base
      );
    });
  };

  const handleEncode = () => {
    const result = caesarCipher(text, parseInt(shift));
    setEncoded(result);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold">
        Caesar Cipher Tool
      </motion.h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <Input
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            min={-25}
            max={25}
          />
          <Button onClick={handleEncode}>Encode</Button>
          <p className="text-lg">Encoded: <strong>{encoded}</strong></p>
        </CardContent>
      </Card>
    </div>
  );
}

// src/components/GameMode.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const randomWords = ['hello', 'world', 'react', 'cipher', 'caesar'];

function encodeCaesar(str, shift) {
  return str.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift + 26) % 26) + base
    );
  });
}

export default function GameMode() {
  const [word, setWord] = useState('');
  const [encodedWord, setEncodedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [correctShift, setCorrectShift] = useState(null);

  const startGame = () => {
    const randWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randShift = Math.floor(Math.random() * 25) + 1;
    setCorrectShift(randShift);
    setWord(randWord);
    setEncodedWord(encodeCaesar(randWord, randShift));
    setGuess('');
    setResult(null);
  };

  const checkGuess = () => {
    setResult(parseInt(guess) === correctShift);
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Guess the Caesar Cipher Shift!</h2>
      <p>Encoded Word: <strong>{encodedWord}</strong></p>
      <input
        type="number"
        className="border rounded p-2"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <div className="flex gap-2">
        <Button onClick={checkGuess}>Submit Guess</Button>
        <Button onClick={startGame}>New Game</Button>
      </div>
      {result !== null && (
        <p className={result ? 'text-green-600' : 'text-red-600'}>
          {result ? 'Correct!' : `Wrong. The shift was ${correctShift}.`}
        </p>
      )}
    </div>
  );
}

// src/components/LearnMorePage.jsx
import React from 'react';

export default function LearnMorePage() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">More About Cryptography</h2>
      <p>
        The Caesar Cipher is one of the simplest and most widely known encryption techniques. But it's just the
        beginning. Modern cryptography includes complex systems like RSA, AES, and elliptic curve cryptography,
        which are used to secure everything from messages to bank transactions.
      </p>
      <ul className="list-disc pl-6">
        <li><a className="text-blue-500 underline" href="https://en.wikipedia.org/wiki/Caesar_cipher">Caesar Cipher - Wikipedia</a></li>
        <li><a className="text-blue-500 underline" href="https://www.khanacademy.org/computing/computer-science/cryptography">Khan Academy - Cryptography</a></li>
        <li><a className="text-blue-500 underline" href="https://crypto.stackexchange.com/">Crypto Stack Exchange</a></li>
      </ul>
    </div>
  );
}
