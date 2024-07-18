import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Listas, Materiais, MainItems } from "./Turma.style";
import Carousel from "./Carousel";
import Resultado from "./Resultado"

function AlunoTurmaInscrito(props) {
    const location = useLocation();
    const { user, turma } = location.state;
    const [listas, setListas] = useState([]);
    const [flag, setFlag] = useState(false)

    console.log("USER: ", props.user)
    console.log("TURMA: ", props.turma)

    useEffect(() => {

        const fetchListas = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/turma/${props.turma.id}/listas`);
                setListas(response.data.listas);
            } catch (error) {
                console.error('Erro ao buscar listas da turma:', error);
            }
        };

        fetchListas();
    }, []);



    return (

        
        <MainContent>
                    <Listas>
                        <h5>Listas</h5>
                        <Carousel
                        
                            items={listas}
                            renderItem={(lista) => (
                                <div onClick={() => props.handleSetFlagLista(true, lista)}>
                                    <svg width="64" height="84" viewBox="0 0 64 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="64" height="84" fill="#8F8787"/>
                                    </svg>
                                    <p>{`Lista ${lista.id}`}</p>
                                </div>
                            )}
                        />
                        
                    </Listas>
                    <Materiais>
                        <h5>Materiais</h5>
                        <Carousel
                            items={[]} 
                            renderItem={() => (
                                <div>
                                    <svg width="64" height="84" viewBox="0 0 64 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="64" height="84" fill="#8F8787"/>
                                    </svg>
                                    <p></p>
                                </div>
                            )}
                        />
                    </Materiais>
                </MainContent>
    );
}

export default AlunoTurmaInscrito;
