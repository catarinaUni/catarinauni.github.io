import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent, Subtitulo } from "./Resultado.style";
import axios from "axios";

function Resultado({ lista, aluno }) {
  const [resultados, setResultados] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const alunoId = aluno.id;
  const listaId = lista.id;
  const turmaId = lista.turma_id;
  const [materiais, setMateriais] = useState([]);
  const [formato, setFormato] = useState()
  const [chamada, setChamada] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [matRelev, setMatRelev] = useState([])

  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(turmaId, listaId);
    axios
      .get(`http://localhost:8800/grupos/chamada`, {
        params: {
          turmaId,
          listaId,
        },
      })
      .then((response) => {
        console.log("CHAMADA: ", response.data.exists);
        setChamada(response.data.exists);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  
 useEffect(() => {
   axios
     .get(`http://localhost:8800/aluno/turma/resultado/verificarAluno`, {
       params: {
         listaId: lista.id,
         alunoId: aluno.id,
       },
     })
     .then((response) => {
       console.log("aluno", response.data);
       setScore(response.data[0]["score"]);
       setFormato(response.data[0]["formato"]);
       const tagsString = response.data[0]["tags"];

       const tagsArray = tagsString.split(",").map((tag) => tag.trim());
       console.log(tagsArray);

       setTopTags(tagsArray);
     })
     .catch((error) => {
       console.error(error);
     });
 }, [lista.id, aluno.id]);

 // Processar materiais quando topTags ou formato mudarem
 useEffect(() => {
   if (topTags.length === 0 || !formato) return; // Verifique se as tags e o formato estão disponíveis

   axios
     .get(`http://localhost:8800/aluno/turma/listaRef/${listaId}`)
     .then((response) => {
       console.log("resssss", response.data);
       setMateriais(response.data);

       let allFormats = [];
       let oneFormat = [];

       response.data.forEach((material) => {
         const tagsDisc = material.tag;
         const tagsFormt = material.formato;

         console.log("Processing Material:", material, topTags);

         if (topTags.includes(tagsDisc)) {
           if (tagsFormt === formato) {
             oneFormat.push(material.ref);
             console.log("Added to oneFormat:", material.ref);
           } else {
             allFormats.push(material.ref);
             console.log("Added to allFormats:", material.ref);
           }
         }
       });

       console.log("All Formats:", allFormats);
       console.log("One Format:", oneFormat);

       allFormats.sort(() => Math.random() - 0.5);
       const materiaisRelevantes = oneFormat.concat(allFormats).slice(0, 30);
       setMatRelev(materiaisRelevantes);

       console.log("Materiais Relevantes:", materiaisRelevantes);
     })
     .catch((error) => console.log(error));
 }, [topTags, formato, listaId]);

  

  useEffect(() => {
    if (chamada) {
      axios
        .get(`http://localhost:8800/grupos/getGrupos`, {
          params: { turmaId, listaId },
        })
        .then((response) => {
          
          setGrupos(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [chamada, turmaId, listaId]);

  return (
    <Main>
      <MainContent>
        <MainItems>
          <ListaNome>{lista.nome}</ListaNome>
          <Subtitulo>
            <p className="subtitulo">Veja aqui os resultados</p>
          </Subtitulo>
          <Result>
            <ResultContent>
              <p>Média de acertos: </p>
              <div>
                <h4>{score}</h4>
              </div>
            </ResultContent>
            <ResultContent>
              <p>Assuntos recomendados para estudo</p>
              <div>
                <ul>
                  {topTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
            </ResultContent>
            <ResultContent>
              <p>Materiais Recomendados</p>
              <div>
                <ul>
                  {matRelev.map((ref, index) => (
                    <li key={index}>{ref}</li>
                  ))}
                </ul>
              </div>
            </ResultContent>
          </Result>
          
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default Resultado;
