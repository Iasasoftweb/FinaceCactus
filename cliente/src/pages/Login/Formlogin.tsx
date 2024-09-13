import  { useState } from "react";
import "./Login.css";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";

function Formlogin() {
  const tx ='';
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  
  const validarCredencial = (e) => {
    e.preventDefault();   
    console.log(username, pass);
     axios.post('http://localhost:3001/login', {username, pass} )
     .then(res => console.log(res))
     .catch(err => console.log(err));

  }
  // // const userConsulta = ()=> {
  // //   axios.get("http://localhost:3001");
  // };

  return (
    <>
      <br />

      
      <form className="mt-5">
        {/* <!-- Email input --> */}
        
        <div data-mdb-input-init className="form-outline mb-4">
          <label
            className="form-label fs-6 font-raleway"
            htmlFor="form2Example1"
          >
            Usuario
          </label>
          <input
            type="text"
            id="form2Example2"
            className="form-control"
            onChange={(event) => {
              setUsername(event.target.value);
            }}></input>
          
          {/* <InputText value={tx} onChange={(event) =>setUsername(event.target.value)}  /> */}
         
          {/* <input
            type="email"
            id="form2Example1"
            className="form-control"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /> */}
        </div>

        {/* <!-- Password input --> */}
        <div data-mdb-input-init className="form-outline mb-4 ">
          <label
            className="form-label fs-6 font-raleway"
            htmlFor="form2Example2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}

        {/* <!-- Submit button --> */}
        <div className="d-flex justify-content-center mt-5">
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn mb-4 px-5 "
            onClick={validarCredencial}         
          >
            Entrar
          </button>
        </div>

        {/* <!-- Register buttons --> */}
      </form>
    </>
  );
}

export default Formlogin;
