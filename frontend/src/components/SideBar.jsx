import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Side, NewTurmaButton, SideBarItems, TurmaButton, TurmasItems, TurmasList, UserItems, Modal, ModalContent, CloseButton, ErrorMessage } from './SideBar.style';
import imgt from "../assets/imgt.png";

function SideBar(props) {
    const [showModal, setShowModal] = useState(false);
    const [turmaCode, setTurmaCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [turmas, setTurmas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/turmas/${props.userId}`);
                setTurmas(response.data.turmas);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };

        fetchTurmas();
    }, [props.userId]);

    const handleParticiparClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
        setTurmaCode('');
    };

    const handleTurmaCodeChange = (e) => {
        setTurmaCode(e.target.value);
    };

    const handleParticiparSubmit = async () => {
        try {
            await axios.post('http://localhost:8800/participar-turma', {
                userId: props.userId,
                turmaCode
            });
            handleCloseModal();
            // Atualiza a lista de turmas após participar de uma nova turma
            const response = await axios.get(`http://localhost:8800/turmas/${props.userId}`);
            setTurmas(response.data.turmas);
        } catch (error) {
            console.error('Erro ao participar da turma:', error);
            setErrorMessage('Código da turma inválido ou erro ao adicionar.');
        }
    };

    const handleTurmaClick = (turma) => {
        navigate(`/turma/${turma.id}`, { state: { user: { name: props.userName, userType: props.userType, id: props.userId }, turma } });
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
                            <NewTurmaButton>criar turma</NewTurmaButton>
                        )}
                    </TurmasItems>
                </SideBarItems>
            </Side>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                        <h2>Participar de Turma</h2>
                        <input
                            type="text"
                            value={turmaCode}
                            onChange={handleTurmaCodeChange}
                            placeholder="Código da Turma"
                        />
                        <button onClick={handleParticiparSubmit}>Participar</button>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}

export default SideBar;
