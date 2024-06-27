import React from "react";
import { useLocation } from 'react-router-dom';
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Listas, Materiais, MainItems, Image } from "./Turma.style";
import Carousel from "./Carousel";
import alunos from '../data/alunos.json';

function AlunoTurma() {
    const location = useLocation();
    const user = location.state?.user;

    if (!user) {
       <h1>deu merda</h1>
        return null;
    }

    return (
        <Main>
            <SideBar userName={user.name} userType={user.userType} userId={user?.id} />
            <MainContent>
                <Header>
                    <Title>Inteligência Artificial</Title>
                    <p>Código: 1234567</p>
                </Header>
                <MainItems>
                    <Listas>
                        <h5>Listas</h5>
                        <Carousel
                            items={alunos}
                            renderItem={(aluno) => (
                                <>
                                    <Image src={`data:image/png;base64,${aluno.imagem}`} alt={aluno.nome} />
                                    <p>{aluno.nome}</p>
                                </>
                            )}
                        />
                    </Listas>
                    <Materiais>
                        <h5>Materiais</h5>
                        <Carousel
                            items={alunos}
                            renderItem={(aluno) => (
                                <>
                                    <Image src={`data:image/png;base64,${aluno.imagem}`} alt={aluno.nome} />
                                    <p>{aluno.nome}</p>
                                </>
                            )}
                        />
                    </Materiais>
                </MainItems>
            </MainContent>
        </Main>
    );
}

export default AlunoTurma;
