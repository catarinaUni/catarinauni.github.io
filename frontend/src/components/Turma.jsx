import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Main,
  MainContent,
  Alunos,
  Titulo,
  Listas,
  Materiais,
  MainItems,
  Image,
  ButtonNew,
  StyledImage,
} from "./Turma.style";
import Carousel from "./Carousel";
import imageTest from "../assets/imgt.png";
import Modal from "./Modal";
import listLogo from "../assets/listLogo.png";
import refLogo from "../assets/refLogo.png";

function Turma({
  user,
  turma,
  handleSetFlagNovaLista,
  handleSetFlagLista,
  handleSetFlagNovaRef,
}) {
  const [alunos, setAlunos] = useState([]);
  const [listas, setListas] = useState([]);
  const [refs, setRefs] = useState([]);
  const turmaId = turma.id;
  const [selectedRef, setSelectedRef] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        console.log("alunos em turma ID:", turma.id);
        const response = await axios.get(
          `http://localhost:8800/turma/${turma.id}/ListarAlunos`
        );
        console.log("Resposta da API:", response.data.alunos);
        setAlunos(response.data.alunos);
      } catch (error) {
        console.error("Erro ao buscar alunos da turma:", error);
      }
    };

    const fetchListas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/turma/${turma.id}/listas`
        );
        setListas(response.data.listas.reverse());
      } catch (error) {
        console.error("Erro ao buscar listas da turma:", error);
      }
    };

    const fetchRefs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/aluno/turma/turmaRef/${turmaId}`
        );
        setRefs(response.data.reverse());
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar refs da turma:", error);
      }
    };

    fetchAlunos();
    fetchListas();
    fetchRefs();
  }, [turma.id]);

  const openModal = (refData) => {
    setSelectedRef(refData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRef(null);
  };

  return (
    <Main>
      <MainContent>
        <MainItems>
          <Alunos>
            <Titulo>
              <p>Alunos</p>
            </Titulo>
            <Carousel
              items={alunos}
              renderItem={(aluno) => (
                <div className="dataCaros">
                  <StyledImage style={{ border: "1px solid #533ad4" }}>
                    {aluno.nome[0]}
                  </StyledImage>
                  <p style={{ color: "#494949" }}>{aluno.nome}</p>
                </div>
              )}
            />
          </Alunos>

          <Listas>
            <Titulo>
              <div>
                <p>Listas</p>
              </div>
              <ButtonNew
                onClick={() => handleSetFlagNovaLista(true)}
                className="new"
              >
                Nova lista
              </ButtonNew>
            </Titulo>
            <Carousel
              items={listas}
              renderItem={(lista) => (
                <div
                  onClick={() => handleSetFlagLista(true, lista)}
                  className="dataCaros"
                >
                  <StyledImage>
                    <div className="listLogo">
                      <img src={listLogo} alt="listLogo" />
                    </div>
                  </StyledImage>

                  <p style={{ color: "#494949" }}>{lista.nome}</p>
                </div>
              )}
            />
          </Listas>

          <Materiais>
            <Titulo>
              <div>
                <p>Referencias</p>
              </div>
              <ButtonNew
                onClick={() => handleSetFlagNovaRef(true)}
                className="new"
              >
                Nova Referência
              </ButtonNew>
            </Titulo>
            <Carousel
              items={refs}
              renderItem={(ref) => (
                <div onClick={() => openModal(ref)} className="dataCaros">
                  <StyledImage>
                    <div className="listLogo refLogo">
                      <img src={refLogo} alt="refLogo" />
                    </div>
                  </StyledImage>
                  <p style={{ color: "#494949" }}>{ref.tag}</p>
                  <p style={{ color: "#5c5c5cc3", "font-size": "12px" }}>
                    {ref.formato}
                  </p>
                </div>
              )}
            />
          </Materiais>
        </MainItems>
      </MainContent>
      <Modal isOpen={isModalOpen} onClose={closeModal} refData={selectedRef} />
    </Main>
  );
}

export default Turma;
