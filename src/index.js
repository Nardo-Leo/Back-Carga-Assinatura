const express = require('express')
const cors = require('cors')


const server = express()

server.use(cors())






//=============================================================================
// Configuração banco de dados

const sql = require("mssql");

const config = {
    user: 'sa',
    password: 'Glass204060*',
    server: '192.168.1.118', // ou o endereço do seu servidor
    database: 'TESTESBUSCA',

    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};
//=============================================================================

server.get('/', (req, res) => {
    res.send('Em Produção, tente novamente')
})

server.get('/busca', (req, res) => {

    // Conecta ao banco de dados
    sql.connect(config, function (err) {
        if (err) {
            console.log('deu erro aqui: ' + err);
            return;
        }

        // Cria um objeto de requisição
        let request = new sql.Request();

        // Executa uma consulta
        request.query('select cliente from viagem  ', function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            // Retorna os registros do banco de dados
            console.log('Abaixo está o Retorno')
            console.log(result.recordset)
            res.json(result.recordset)

        });
    });

})

server.get('/buscaCarga', (req, res)=>{

    sql.connect(config, function (err) {
        if (err) {
            console.log('deu erro aqui: ' + err);
            return;
        }
    
    let request = new sql.Request();
    
    request.query(`SELECT * FROM viagem WHERE ped_carga<=2`, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            // Retorna os registros do banco de dados
            console.log('Abaixo está o Retorno da pagina 2')
            console.log(result.recordset)
            res.json(result.recordset)

        })


})

})


server.get('/numCarga/:id', (req, res)=>{

   const id = parseInt(req.params.id)
   console.log('o id passado que é para ser numero da carga é:... ' + id)

    sql.connect(config, function (err) {
        if (err) {
            console.log('deu erro aqui: ' + err);
            return;
        }
    
    let request = new sql.Request();
    
    request.query(`SELECT * FROM viagem WHERE ped_carga = ${id}`, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            // Retorna os registros do banco de dados
            console.log('Abaixo está o Retorno especifico')
            console.log(result.recordset)
            res.json(result.recordset)

        })


})

})




server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})