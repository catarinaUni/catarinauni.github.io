import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Listas, Materiais, MainItems } from "./Turma.style";
import Carousel from "./Carousel";

function AlunoTurmaInscrito() {
    const location = useLocation();
    const { user, turma } = location.state;
    const [listas, setListas] = useState([]);

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

    if (!user || !turma) {
        return <h1>Erro ao carregar a turma</h1>;
    }

    return (
        <Main>
            <SideBar userName={user.name} userType={user.userType} userId={user?.id} />
            <MainContent>
                <Header>
                    <Title>{turma.nome}</Title>
                    <p>Código: {turma.codigo}</p>
                </Header>
                <MainItems>
                    <Listas>
                        <h5>Listas</h5>
                        <Carousel
                            items={listas}
                            renderItem={(lista) => (
                                <div>
                                    <Link to={`/aluno/turma/lista`}>
                                        <svg width="64" height="84" viewBox="0 0 64 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="64" height="84" fill="#8F8787"/>
                                        </svg>
                                    </Link>
                                    <p>{`Lista ${lista.id}`}</p>
                                </div>
                            )}
                        />
                    </Listas>
                    <Materiais>
                        <h5>Materiais</h5>
                        <Carousel
                            items={[]} // Para materiais, caso ainda não esteja implementado
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
                </MainItems>
            </MainContent>
        </Main>
    );
}

export default AlunoTurmaInscrito;
