import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM perguntas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addQuestion = (req, res) => {
    const { questions } = req.body;

    if (!Array.isArray(questions)) {
        return res.status(400).json({ error: "Data should be an array of questions" });
    }

    const q = "INSERT INTO perguntas (pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta_correta, tag_1, tag_2, tag_3) VALUES ?";
    const values = questions.map((question) => [
        question.pergunta,
        question.alternativa.a,
        question.alternativa.b,
        question.alternativa.c,
        question.alternativa.d,
        question.resposta.correta,
        question.tags[0],
        question.tags[1],
        question.tags[2]
    ]);

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json("Perguntas adicionadas com sucesso.");
    });
};