import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Side, NewTurmaButton, SideBarItems, TurmaButton, TurmasItems, TurmasList, UserItems, ErrorMessage } from './SideBar.style';
import imgt from "../assets/imgt.png";
import { StyledImage } from "./Turma.style";

import { ModalContent, ModalOverlay, CloseButton } from "./Modal.style";

function SideBar(props) {
    const [showModal, setShowModal] = useState(false);
    const [turmaCode, setTurmaCode] = useState('');
    const [turmaName, setTurmaName] = useState(''); // Novo estado para nome da turma
    const [errorMessage, setErrorMessage] = useState('');
    const [turmas, setTurmas] = useState([]);
    const navigate = useNavigate();

    const fetchTurmas = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/turmas/${props.userId}/${props.userType}`);
            setTurmas(response.data.turmas);
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
        }
    };

    useEffect(() => {
        fetchTurmas();
    }, [props.userId, props.userType]);

    const handleParticiparClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
        setTurmaCode('');
        setTurmaName(''); // Limpar nome da turma
    };

    const handleTurmaCodeChange = (e) => {
        setTurmaCode(e.target.value);
    };

    const handleTurmaNameChange = (e) => {
        setTurmaName(e.target.value); // Atualizar nome da turma
    };

    const handleParticiparSubmit = async () => {
        try {
            await axios.post('http://localhost:8800/participar-turma', {
                userId: props.userId,
                turmaCode
            });
            handleCloseModal();
            // Atualiza a lista de turmas após participar de uma nova turma
            fetchTurmas();
        } catch (error) {
            console.error('Erro ao participar da turma:', error);
            setErrorMessage('Código da turma inválido ou erro ao adicionar.');
        }
    };

    const handleCreateTurma = async () => {
        if (turmaName != '') {
            try {
              await axios.post("http://localhost:8800/turmas/criar-turma", {
                professorId: props.userId,
                turmaName,
              });

              fetchTurmas();
              handleCloseModal();
            } catch (error) {
              console.error("Erro ao criar turma:", error);
              setErrorMessage("Erro ao criar turma.");
            }
        } else {
            setErrorMessage("Nome da turma inválido.");
        }
        
    };

    const handleTurmaClick = (turma) => {
        props.handleSetFlagTurma(true, turma);
    };
  
  const handleLogout = () => {
     sessionStorage.clear();
    localStorage.clear();
      navigate("/login", { replace: true });
   };

    return (
      <>
        <Side>
          <SideBarItems>
            <UserItems>
              <StyledImage
                style={{
                  backgroundColor: props.bgcolor || "#E3E3E3",
                  width: "100px",
                  height: "100px",
                }}
              >
                {props.userName[0]}
              </StyledImage>
              <h4>{props.userName}</h4>
              <p>{props.userType}</p>
            </UserItems>
            <TurmasItems>
              <p className="turmas">Turmas</p>
              <TurmasList>
                {turmas.map((turma) => (
                  <TurmaButton
                    key={turma.id}
                    onClick={() => handleTurmaClick(turma)}
                  >
                    {turma.nome}
                  </TurmaButton>
                ))}
              </TurmasList>
              {props.userType === "aluno" ? (
                <NewTurmaButton onClick={handleParticiparClick}>
                  participar de turma
                </NewTurmaButton>
              ) : (
                <NewTurmaButton onClick={handleParticiparClick}>
                  criar turma
                </NewTurmaButton>
              )}
            </TurmasItems>

            <p onClick={handleLogout} className="sair">Sair da conta</p>
          </SideBarItems>
        </Side>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={handleCloseModal}>X</CloseButton>
              {props.userType === "aluno" ? (
                <>
                  <h2>Participar de Turma</h2>
                  <input
                    type="text"
                    value={turmaCode}
                    onChange={handleTurmaCodeChange}
                    placeholder="Código da Turma"
                    className="criarTurma"
                  />
                  <button
                    onClick={handleParticiparSubmit}
                    className="modelButton"
                  >
                    Participar
                  </button>
                </>
              ) : (
                <>
                  <h2>Criar Turma</h2>
                  <input
                    type="text"
                    value={turmaName}
                    onChange={handleTurmaNameChange}
                    placeholder="Nome da Turma"
                    className="criarTurma"
                  />
                  <button onClick={handleCreateTurma} className="modelButton">
                    Criar
                  </button>
                </>
              )}
              {errorMessage && (
                <ErrorMessage className="modalError">
                  {errorMessage}
                </ErrorMessage>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </>
    );
}

export default SideBar;
