var mssql = require("mssql");

const config = {
    user: "BD17095",
    password:"BD17095",
    server: "regulus",
    database: "BD17095"
}


mssql.connect(config)
    .then(conexao => global.conexao = conexao)
    .catch(erro => console.log(erro));

module.exports = mssql;