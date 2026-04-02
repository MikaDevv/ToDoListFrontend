import React, { useState } from 'react';
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChangeEmail = (event) => {
      setEmail(event.target.value);
    };
    const handleChangePassword = (event) => {
      setPassword(event.target.value);
    };
    const handleClick = async () => {
    const response = await api.post("/auth/login",{
      email: email,
      password: password
    })  
    localStorage.setItem("token", response.data)
    console.log("Token salvo!")
    navigate("/tasks");
}

  return (
    <div>
      <input
        type="email"
        value={email} 
        onChange={handleChangeEmail} 
        placeholder="Digite seu email"
      />
      <input
        type="password"
        value={password} 
        onChange={handleChangePassword} 
        placeholder="Digite sua senha"
      />
      <button onClick={handleClick}>
      Entrar
    </button>
    </div>

  );

}
export default Login
