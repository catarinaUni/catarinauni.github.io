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

function Turma({
  user,
  turma,
  handleSetFlagNovaLista,
  handleSetFlagLista,
  handleSetFlagNovaRef,
}) {
  const [alunos, setAlunos] = useState([]);
  const [listas, setListas] = useState([]);
  const [refs, setRefs] = useState([])
  const turmaId = turma.id;
    const [selectedRef, setSelectedRef] = useState(null); // Estado para a referência selecionada
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        console.log("alunos em turma ID:", turma.id);
        const response = await axios.get(
          `http://localhost:8800/turma/${turma.id}/ListarAlunos`
        );
        console.log("Resposta da API:", response.data);
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
        setListas(response.data.listas);
      } catch (error) {
        console.error("Erro ao buscar listas da turma:", error);
      }
    };

    const fetchRefs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/aluno/turma/turmaRef/${turmaId}`
        );
        setRefs(response.data);
        console.log(response.data)
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
              <div>
                <h5>Alunos</h5>
              </div>
            </Titulo>
            <Carousel
              items={alunos}
              renderItem={(aluno) => (
                <>
                  <StyledImage src={imageTest} alt={aluno.nome} />
                  <p>{aluno.nome}</p>
                </>
              )}
            />
          </Alunos>

          <Listas>
            <Titulo>
              <div>
                <h5>Listas</h5>
              </div>
              <ButtonNew onClick={() => handleSetFlagNovaLista(true)}>
                Nova lista
              </ButtonNew>
            </Titulo>
            <Carousel
              items={listas}
              renderItem={(lista) => (
                <div onClick={() => handleSetFlagLista(true, lista)}>
                  <StyledImage src={imageTest} alt={lista.nome} />
                  <p>{lista.nome}</p>
                </div>
              )}
            />
          </Listas>

          <Materiais>
            <Titulo>
              <div>
                <h5>Referencias</h5>
              </div>
              <ButtonNew onClick={() => handleSetFlagNovaRef(true)}>
                Nova Ref
              </ButtonNew>
            </Titulo>
            <Carousel
              items={refs}
              renderItem={(ref) => (
                <div onClick={() => openModal(ref)}>
                  <StyledImage src={imageTest} alt={ref.ref} />
                  <p>{ref.tag}</p>
                  <p>{ref.formato}</p>
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
