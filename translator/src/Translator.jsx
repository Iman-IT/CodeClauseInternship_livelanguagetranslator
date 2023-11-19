import React, { useState } from 'react';

function Translator() {
  const [state, setState] = useState({
    text: '',
    targetLanguage:'',
    translatedText: ''
  });

  const update = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const translate = () => {
    const sourceTextValue = state.text;
    const targetLanguageValue = state.targetLanguage; // Get value from state, not directly from targetLanguage
  
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguageValue}&dt=t&q=${encodeURI(sourceTextValue)}`)
      .then(response => response.json())
      .then(data => {
        const translation = data[0][0][0];
        setState({ ...state, translatedText: translation });
      })
      .catch(error => console.error('Error:', error));
  }
  
  const playOutput = () => {
 
    try {
      const message = new SpeechSynthesisUtterance(state.translatedText);
      window.speechSynthesis.speak(message);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  }
  
  return (
    <section className="vh-100" style={{background:'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'}}>
      <div className="container-fluid">
        <div className="row mx-auto justify-content-center align-items-center">
        <h2 className="mb-3 text-center mt-4">Live Language Translator</h2>
      
        <div className="col-12 col-md-6 col-sm-4">
     
        <div className="card p-5">
        
          <textarea
            id="sourceText"
            name='text'
            placeholder="Enter text to translate"
            onChange={update}
            value={state.text}
            className='form-control' />
          <select  name='targetLanguage' className='form-control mt-3' onChange={update}>
                <option value="ps">Pashto</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
             <option value="fr">French</option>
             <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="tr">Turkish</option>
          </select>
       <button id="translateBtn" className='btn btn-primary mt-3' onClick={translate}>
            Translate </button>
              <div className="d-flex">
              <button className='btn' onClick={playOutput}><img src="sound.png" width={30} height={30} alt="" /></button>
                <h5 className='mt-3 '   > {state.translatedText}</h5>
               
                 
             
              </div>
         
        </div>
          </div>
          <div className="col-12 col-md-5 col-sm-4 order-0">
            <img src="1.png" className='img-fluid' alt="" />
        </div>  
          
        </div>
    </div></section>
  )
}

export default Translator;
