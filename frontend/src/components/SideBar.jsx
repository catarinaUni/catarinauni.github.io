import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Side, NewTurmaButton, SideBarItems, TurmaButton, TurmasItems, TurmasList, UserItems, Modal, ModalContent, CloseButton, ErrorMessage } from './SideBar.style';
import imgt from "../assets/imgt.png";

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
        try {
            await axios.post('http://localhost:8800/turmas/criar-turma', {
                professorId: props.userId,
                turmaName
            });
            // Atualiza a lista de turmas após criar uma nova turma
            fetchTurmas();
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao criar turma:', error);
            setErrorMessage('Erro ao criar turma.');
        }
    };

    const handleTurmaClick = (turma) => {
        props.handleSetFlagTurma(true, turma);
    };

    return (
        <>
            <Side>
                <SideBarItems>
                    <UserItems>
                        <img src={imgt} alt="" />
                        <h4>{props.userName}</h4>
                        <p>{props.userType}</p>
                    </UserItems>
                    <TurmasItems>
                        <h5>Turmas</h5>
                        <p></p>
                        <TurmasList>
                            {turmas.map((turma) => (
                                <TurmaButton key={turma.id} onClick={() => handleTurmaClick(turma)}>
                                    {turma.nome}
                                </TurmaButton>
                            ))}
                        </TurmasList>
                        {props.userType === 'aluno' ? (
                            <NewTurmaButton onClick={handleParticiparClick}>participar de turma</NewTurmaButton>
                        ) : (
                            <NewTurmaButton onClick={handleParticiparClick}>criar turma</NewTurmaButton>
                        )}
                    </TurmasItems>
                </SideBarItems>
            </Side>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                        {props.userType === 'aluno' ? (
                            <>
                                <h2>Participar de Turma</h2>
                                <input
                                    type="text"
                                    value={turmaCode}
                                    onChange={handleTurmaCodeChange}
                                    placeholder="Código da Turma"
                                />
                                <button onClick={handleParticiparSubmit}>Participar</button>
                            </>
                        ) : (
                            <>
                                <h2>Criar Turma</h2>
                                <input
                                    type="text"
                                    value={turmaName}
                                    onChange={handleTurmaNameChange}
                                    placeholder="Nome da Turma"
                                />
                                <button onClick={handleCreateTurma}>Criar</button>
                            </>
                        )}
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}

export default SideBar;
