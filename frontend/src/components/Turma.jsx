import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Main, MainContent, Header, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew } from "./Turma.style";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

function Turma({ user, turma, handleSetFlagNovaLista }) {
    const [alunos, setAlunos] = useState([]);
    const [listas, setListas] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                console.log("alunos em turma ID:", turma.id);
                const response = await axios.get(`http://localhost:8800/turma/${turma.id}/ListarAlunos`);
                console.log('Resposta da API:', response.data);
                setAlunos(response.data.alunos);
            } catch (error) {
                console.error('Erro ao buscar alunos da turma:', error);
            }
        };

        const fetchListas = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/turma/${turma.id}/listas`);
                setListas(response.data.listas);
            } catch (error) {
                console.error('Erro ao buscar listas da turma:', error);
            }
        };

        fetchAlunos();
        fetchListas();
    }, [turma.id]);

    return (
        <Main>
            <MainContent>
                <MainItems>
                    <Alunos>
                        <Titulo>
                            <div>
                                <h5>Alunos</h5>
                                <p></p>
                            </div>
                        </Titulo>
                        <Carousel
                            items={alunos}
                            renderItem={(aluno) => (
                                <>
                                    <Image src={`data:image/png;base64,${aluno.imagem}`} alt={aluno.nome} />
                                    <p>{aluno.nome}</p>
                                </>
                            )}
                        />
                    </Alunos>

                    <Listas>
                        <Titulo>
                            <div>
                                <h5>Listas</h5>
                                <p></p>
                            </div>
                            <ButtonNew onClick={() => handleSetFlagNovaLista(true)}>
                                
                                    Nova lista

                            </ButtonNew>
                        </Titulo>
                        <Carousel
                            items={listas}
                            renderItem={(lista) => (
                                <>
                                    <Image src={`data:image/png;base64,${lista.imagem}`} alt={lista.nome} />
                                    <p>{lista.nome}</p>
                                </>
                            )}
                        />
                    </Listas>

                    <Materiais>
                        <Titulo>
                            <div>
                                <h5>Referencias</h5>
                                <p></p>
                            </div>
                        </Titulo>
                        <Carousel
                            items={listas}
                            renderItem={(lista) => (
                                <>
                                    <Image src={`data:image/png;base64,${lista.imagem}`} alt={lista.nome} />
                                    <p>{lista.nome}</p>
                                </>
                            )}
                        />
                    </Materiais>
                </MainItems>
            </MainContent>
        </Main>
    );
}

export default Turma;
