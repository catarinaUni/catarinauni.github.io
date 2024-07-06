import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa o componente Routes

import Hero from './components/Hero';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import NavBar from './components/NavBar';
import Turma from './components/Turma';
import NewList from './components/NewList'
import AlunoTurma from './components/AlunoTurma';
import Lista from './components/Lista';
import Resultado from './components/Resultado';
import AlunoTurmaInscrito from './components/AlunoTurmaInscrito';
import ProfessorMain from './components/ProfessorMain'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/cadastro" element={<Cadastro />} /> 
                <Route path='/professor' element={<ProfessorMain/>} />
                <Route path="professor/turma" element={<Turma />} /> 
                <Route path="professor/turma/novalista" element={<NewList />} />
                <Route path="aluno/turma" element={<AlunoTurma />} /> 
                <Route path="aluno/turma/lista" element={<Lista />} />  
                <Route path="aluno/turma/lista/resultado" element={<Resultado />} />  
                <Route path="/" element={<Hero />} /> 
                <Route path="/turma/:id" element={<AlunoTurmaInscrito />} />
            </Routes>
        </Router>
    );
}

export default App;
