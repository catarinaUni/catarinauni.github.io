import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "questaoai"
})

db.connect(err => {
    if(err){
        console.log("Erro ao conectar banco de dados", err)
    }
})