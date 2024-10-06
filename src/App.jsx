import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";


function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "@#$%&*~";

    for (let i=1; i <=length; i++) {
      let chars = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(chars);
    }

    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 25)
    window.navigator.clipboard.writeText(Password);
  }, [Password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, number, char, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my- text-orange-500 bg-gray-700">
        <h1 className="text-center text-xl text-white my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 py-4">
            <input
              type="text"
              value={Password}
              className="outline-none w-full px-3 py-1 rounded-lg"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={25}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={number}
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="charInput"
                defaultChecked={char}
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">characters</label>
            </div>
          </div>
      </div>
    </>
  );
}

export default App;
