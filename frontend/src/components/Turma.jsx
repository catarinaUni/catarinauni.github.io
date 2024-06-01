import React from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew} from "./Turma.style";
import Carousel from "./Carousel";
import alunos from '../data/alunos.json'
import { Link } from "react-router-dom";



function Turma(props){

    return(
        <>

        <Main>
            <SideBar/>

            <MainContent>
                <Header>
                    <Title>Inteligencia Artificial</Title>
                    <p>Codigo: 1234567</p>
                </Header>
                <MainItems>
                    <Alunos>
                        <Titulo>
                        <div>
                        <h5>Listas</h5>
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
                            
                            <ButtonNew>
                                <Link to="novalista">
                                    Nova lista
                                </Link>
                            </ButtonNew>

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

                    </Listas>
                    <Materiais>

                    <Titulo>
                    <div>
                        <h5>Listas</h5>
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

                    </Materiais>

                </MainItems>
            </MainContent>
        </Main>
        </>
    )
}

export default Turma;