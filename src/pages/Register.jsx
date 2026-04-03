import React, { useState } from 'react';
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navigate = useNavigate();

    const handleChangeName = (event) => {
      setName(event.target.value);
    };
    const handleChangeEmail = (event) => {
      setEmail(event.target.value);
    };
    const handleChangePassword = (event) => {
      setPassword(event.target.value);
    };
    const handleRegister = async () => {
    if(name === ''){setError("Por favor insira o seu nome."); return}
    if(email === '' || !emailRegex.test(email)){setError("Por favor insira um email válido!"); return}
    if(password === ''){setError("Por favor insira a senha."); return}
    if(password.length < 8){setError("A senha deve ter no mínimo 8 caracteres."); return}
    try{const response = await api.post("/users/create",{
      name: name,
      email: email,
      password: password
    })
    navigate("/login");
    }catch(error){
        setError(error.response.data.error);
    }  

}

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">
        <h1 className="text-white text-2xl font-bold text-center">Faça seu cadastro!</h1>
        <input
          type="name"
          value={name}
          required
          onChange={handleChangeName}
          placeholder="Digite seu nome"
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          required
          onChange={handleChangeEmail}
          placeholder="Digite seu email"
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Digite sua senha"
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" required
        />
        <button
          onClick={handleRegister}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Registrar-se
        </button>
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <p className="text-gray-400 text-center">Já tem uma conta? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
      </div>
    </div>
  );

}
export default Register
