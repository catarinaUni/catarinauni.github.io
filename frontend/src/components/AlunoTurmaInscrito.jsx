import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MainContent, Listas, Materiais } from "./Turma.style";
import Carousel from "./Carousel";

function AlunoTurmaInscrito(props) {
    const { user, turma } = props;
    const [listas, setListas] = useState([]);

    console.log("USER: ", user);
    console.log("TURMA: ", turma);

    useEffect(() => {
        const fetchListas = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/turma/${turma.id}/listas`);
                setListas(response.data.listas);
            } catch (error) {
                console.error('Erro ao buscar listas da turma:', error);
            }
        };

        fetchListas();
    }, [turma.id]);

    return (
        <MainContent>
            <Listas>
                <h5>Listas</h5>
                <Carousel
                    items={listas}
                    renderItem={(lista) => (
                        <div onClick={() => props.handleSetFlagLista(true, lista)}>
                            <svg width="64" height="84" viewBox="0 0 64 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="64" height="84" fill="#8F8787" />
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
                                <rect width="64" height="84" fill="#8F8787" />
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
