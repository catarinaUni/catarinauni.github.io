import { db } from "../db.js";

export const getQuestions = (req, res) => {
    const q = "SELECT id, pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d FROM perguntas";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        const questions = data.map(row => ({
            id: row.id,
            question: row.pergunta,
            alternatives: {
                a: row.alternativa_a,
                b: row.alternativa_b,
                c: row.alternativa_c,
                d: row.alternativa_d
            }
        }));

        return res.status(200).json(questions);
    });
};

export const saveAnswers = (req, res) => {
    const { alunoId, respostas } = req.body;

    console.log("Recebendo respostas:", req.body);

    const query = "INSERT INTO respostas (pergunta_id, resposta) VALUES ?";

    const values = respostas.map(resposta => [resposta.perguntaId, resposta.respostaAluno]);

    console.log("Valores para inserção:", values);

    db.query(query, [values], (err, data) => {
        if (err) {
            console.error("Erro ao salvar respostas:", err);
            return res.status(500).json(err);
        }

        return res.status(200).json("Respostas salvas com sucesso.");
    });
};


export const checkAnswers = (req, res) => {
    console.log("Oi");

    const query = `
        SELECT r.pergunta_id, r.resposta, p.tag_1, p.tag_2, p.tag_3, p.resposta_correta AS resposta_correta
        FROM respostas r
        JOIN perguntas p ON r.pergunta_id = p.id;
    `;

    db.query(query, (err, data) => {
        if (err) return res.json(err);
    
        const resultados = data.map(item => ({
            perguntaId: item.pergunta_id,
            respostaAluno: item.resposta,
            respostaCorreta: item.resposta_correta,
            correta: item.resposta === item.resposta_correta,
            tag1: item.tag_1,
            tag2: item.tag_2,
            tag3: item.tag_3
        }));
    
        const totalTagCounts = {};
        const wrongTagCounts = {};
    
        resultados.forEach(item => {
            const tags = [item.tag1, item.tag2, item.tag3].filter(Boolean);
            tags.forEach(tag => {
                totalTagCounts[tag] = (totalTagCounts[tag] || 0) + 1;
            });
        });
    
        resultados.forEach(item => {
            if (!item.correta) {
                const tags = [item.tag1, item.tag2, item.tag3].filter(Boolean);
                tags.forEach(tag => {
                    wrongTagCounts[tag] = (wrongTagCounts[tag] || 0) + 1;
                });
            }
        });
    
        const tagErrorRates = Object.keys(wrongTagCounts).reduce((acc, tag) => {
            acc[tag] = wrongTagCounts[tag] / totalTagCounts[tag];
            return acc;
        }, {});
    
        const sortedTags = Object.entries(tagErrorRates)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(entry => entry[0]);
    
        console.log(sortedTags);
    
        return res.status(200).json({
            resultados,
            topTags: sortedTags
        });
    });
    
};
