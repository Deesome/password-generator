
import { useState, useEffect, useCallback } from 'react';
import './App.css'


function App() {
  const [password, setPassword] = useState("")
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charcterAllowed, setCharacterAllowed] = useState(false)
  const [length, setLength] = useState(8)

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '1234567890'
    if (charcterAllowed) str += '#$%&()*+,-./:;<=>?@^_{|}~'

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
    console.log(password)

   
},[numberAllowed, charcterAllowed, length,setPassword]) 

useEffect(() => {
  passwordGenerator();
}, [numberAllowed, charcterAllowed, length,passwordGenerator]);

const copyToClipboard= () =>{
  window.navigator.clipboard.writeText(password)
  .then(()=>{
    alert("Password Copied Copied")
  })
  .catch((error) =>{
    alert("Password not Copied",error)

  })
  // geolocation isa also a asynchronus function that means they always return promise
  // navigator.geolocation.getCurrentPosition(
  //   (position) => console.log(position),
  //   (error) => console.error(error)
  // );
}

 




  return (
    <>
      <div className='w-full h-screen flex justify-center items-center bg-slate-500'>
        <div className='w-1/3 flex flex-col justify-center items-center gap-3 bg-cyan-700 rounded-xl shadow-xl p-6'>
          <h1 className="text-white text-3xl">Password Generator</h1>
          <div>
            <input className='text-2xl rounded-lg p-2' type="text"
              value={password}
              readOnly
            />

            <button onClick={copyToClipboard} className='text-2xl rounded-lg p-2 border-solid border-2 border-blue-700 bg-blue-600 hover:bg-blue-500 transition-all 0.3s ease-in'>COPY</button>
          </div>
          <div className='flex justify-center items-center gap-3 text-xl'>
            <input type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e)=>setLength(e.target.value)} />
            <label htmlFor="">Length({length})</label>

            <input
             type="checkbox"
             defaultChecked={numberAllowed}
             
             onChange={()=>{setnumberAllowed(prev=>!prev)}} />
            <label htmlFor="">Numbers</label>

            <input
             type="checkbox"
             defaultChecked={charcterAllowed}
             onChange={()=>{setCharacterAllowed(prev=>!prev)}} />
            <label htmlFor="">Character</label>
          </div>

        </div>


      </div>




    </>
  )
}

export default App
