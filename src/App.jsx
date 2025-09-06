import { useCallback, useEffect, useState , useRef } from 'react'


function App() {
  
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);




  // useCallback(function,dependencies(arr format))

  const passwordGenerator = useCallback( () =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*(){}[]?/><";

    for(let i = 0 ; i < length ; i++){

      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numAllowed,charAllowed]);


  const copyPassToClip = useCallback(() => {

    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect( ()=> {
      passwordGenerator();
  },[length,numAllowed,charAllowed]);

  return (
    <>
        <div className='w-full max-w-sm mx-auto rounded-xl py-8 my-32 text-orange-500 bg-gray-600 shadow-2xl'>
         
          <h1 className='text-center text-white font-semibold text-xl'>Password Generator</h1>
          <div className='text-black px-2 flex'>
            <input 
            type="text"
            className="outline-none px-3 py-1 w-full flex rounded-full"
            placeholder="password"
            value={password}
            readOnly
            ref={passwordRef}
            />
            <button className='bg-blue-700 text-white px-3 ml-2 active:bg-blue-900'onClick={copyPassToClip}>
              Copy
            </button>
          </div>

         <div className='flex'>

          <div className='flex mt-2'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={ (e) => { setLength(e.target.value)}}
            />

            <label>
              Length: {length}
            </label>
          </div>

          <div className='mt-2'>
            <input 
            type="checkbox"
            defaultChecked={numAllowed}
            className='cursor-pointer mx-1'
            onChange= { () => {
              setnumAllowed( (prev) => !prev);
            }}

             />
            <label>Number</label>


            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            className='cursor-pointer mx-1'
            onChange= { () => {
              setCharAllowed( (prev) => !prev);
            }}

             />
            <label>Character</label>
            
          </div>
            
        </div>
          
          
        </div>


    </>
  )
}
export default App
