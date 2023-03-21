import React, { useState } from 'react'
import Copyimage from "./images/icon-copy.svg"
import { useForm } from './useForm'
import { getSpecialChar } from './utils'
import { getRandomChar } from './utils'
import { toast } from 'react-hot-toast'

const App = () => {

    const [values1,setValues1]=useForm({
        length:6,
        capital:true,
        small:true,
        number:true,
        symbol:true
    })
    

    const [result,setResult]=useState("")

    const fieldsArray=[
        {
            field: values1.capital,
            getChar:()=>getRandomChar(65, 90)
        },
        {
            field: values1.small,
            getChar:()=>getRandomChar(97, 122)
        },
        {
            field: values1.number,
            getChar:()=>getRandomChar(48, 57)
        },
        {
            field:values1.symbol,
            getChar:()=>getSpecialChar()
        }
    ]
    const handleOnSubmit=(e)=>{
        e.preventDefault();

        let generatedPassword='';
        const checkedFields=fieldsArray.filter(({field})=>field);
        
        
        for(let i=0; i<values1.length;i++){
            const index =Math.floor(Math.random()*
            checkedFields.length);
            
            const letter=checkedFields[index]?.getChar();
            if(letter){
                generatedPassword+=letter;
            }
        }
        if (generatedPassword){
            setResult(generatedPassword)
        }else{
            toast.error('Please select at least one option')
        }
    }

    const handleClipboard=async()=>{
        if(result){
            await navigator.clipboard.writeText(result)
            toast.success("Copied to your clipboard")
        }else{
            toast.error("No password to copy")
        }
        
        
    }
    
  return (
    <section>
        <div className="container">
            <form id='pg-form' onSubmit={handleOnSubmit}>
                <div className="result">
                    <input type="text" id='result' placeholder='Min 6 Char' readOnly value={result}/>
                    <div className="clipboard" onClick={handleClipboard}>
                        <img src={Copyimage} alt="whaaat" />
                    </div>
                </div>
                <div>
                    <div className="field1">
                        <label htmlFor="length">Character Length<h1>{values1.length}</h1></label>
                        <input type="range"  id='length' min={6}
                        max={12} name="length"value={values1.length}
                        onChange={setValues1}
                        />
                        
                    </div>
                    <div className="field">
                        <label htmlFor="capital">Include Uppercase Letters</label>
                        <input type="checkbox"  id="capital"
                        name="capital" 
                        checked={values1.capital}
                        onChange ={setValues1}/>
                    </div>
                    <div className="field">
                        <label htmlFor="small">Include Lowercase Letters</label>
                        <input type="checkbox"  id="small" 
                        name="small"
                        checked={values1.small}
                        onChange ={setValues1} />
                    </div>
                    <div className="field">
                        <label htmlFor="number">Include Numbers</label>
                        <input type="checkbox"  id="number" 
                        name="number"
                        checked={values1.number}
                        onChange ={setValues1}/>
                    </div>
                    <div className="field">
                        <label htmlFor="symbol">Include Symbols</label>
                        <input type="checkbox"  id="symbol"
                        name="symbol" 
                        checked={values1.symbol}
                        onChange ={setValues1}/>
                    </div>
                </div>
                <button type='submit'>Generate Password</button>
            </form>
        </div>
    </section>
  )
}

export default App