

module.exports = (app) => {
    var conexao = require("../config/custom-mssql.js");

    function execSQL(sql, resposta){
        global.conexao.request()
        .query(sql)
        .then(resultado => resposta.json(resultado.recordset))
        .catch(erro => resposta.json(erro));
    }

    var path = require("path");
    
    
    app.get("/", function(req, res){
        res.sendFile('index.html', { root: path.join((__dirname, "./"))});
    });

    app.get("/Cadastro.html", function(req, res){
        res.sendFile('cadastro.html', { root: path.join((__dirname, "./"))});
    });

    app.get("/login.html", function(req, res){
        res.sendFile('login.html', { root: path.join((__dirname, "./"))});
    });

    app.get("/index.html", function(req, res){
        res.redirect("/");
    });

    app.get("/category.html", function(req, res){
        res.sendFile('category.html', { root: path.join((__dirname, "./"))});
    });

    app.get("/checkout.html", function(req, res){
        res.sendFile('checkout.html', { root: path.join((__dirname, "./"))});
    });

    app.get("/cart.html", function(req, res){
        res.sendFile('cart.html', { root: path.join((__dirname, "./"))});
    });

    app.get("/contact.html", function(req, res){
        res.sendFile('contact.html', { root: path.join((__dirname, "./"))});
    });

    app.post("/cadastrar", function(req, res){
        console.log(req.body);
        var email = req.body.email;
        var senha = req.body.senha;
        var nome = req.body.nome;

        var msg = `insert into usuario values ('${nome}', '${email}', '${senha}')`;
        execSQL(msg, res);
        res.redirect("/");
    });

    app.post("/logar", async function(req, res){
        console.log(req.body);
        var email = req.body.email;
        var senha = req.body.senha;

        var sql = "select * from usuario where email = '" + email+ "'";
        let resultado = await global.conexao.request().query(sql);

        if(resultado.recordset.length == 0)
            res.redirect("login.html");
        resultado.recordset.forEach(function(item){
            if(senha == item.senha){
                res.redirect("/");
            }
            else{
                res.redirect("login.html");
            }
        });
    });

    app.post("/comprar", function(req, res){
        console.log(req.body);
        var quantity = req.body.quantity;
        var nome     = req.body.nome;

        var bd = `select quantidade from pordutoLoja where nome = '${nome}'`;

        var quantidade = bd - quantity;

        if(quantidade < 0){
            quantidade = 0;
        }

        var msg = `update produtoLoja set quantidade = ${quantidade} where nome = '${nome}`;

        execSQL(msg, res);
        res.redirect("/");
        
    });

    app.get("/produto", function(req, res){
        var msg = "select * from produtoLoja";
        execSQL(msg, res);

    

        /* $.getJSON(http://localhost:3000/produto, function(result){
            var arr = result;
            String html = "<div>"
            for(var i = 0; i < arr.length; i++)
            {
                arr[i].id
                arr[i].codigo
                arr[i].nome
                var img = arr[i].imagem;
                html += "<img src=img>"
            }
            $(#).innerHtml(html);

            
        }); */

    });

}