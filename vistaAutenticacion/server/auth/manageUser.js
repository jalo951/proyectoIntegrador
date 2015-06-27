var pwdMgr = require('./managePasswords');

module.exports = function(server, db) {


    //########################################################################################### 

    server.post('/registrar', function(req, res, next) {
        var user = req.params;
        pwdMgr.cryptPassword(user.contrasena, function(err, hash) {
            user.contrasena = hash;
            console.log("n", hash);
            db.usuarios.insert(user,
                function(err, dbUser) {
                    if (err) { // duplicate key error
                        if (err.code == 11000) /* http://www.mongodb.org/about/contributors/error-codes/*/ {
                            res.writeHead(400, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify({
                                error: err,
                                message: "Ya existe un usuario con este email"
                            }));
                        }
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        dbUser.contrasena = "";
                        res.end(JSON.stringify(dbUser));
                    }
                });
        });
        return next();
    });




    //########################################################################################### 
    server.post('/login', function(req, res, next) {

        console.log('Server login')
        console.log(req.params.email)
        console.log(req.params.contrasena)


        var user = req.params;
        if (user.email.trim().length == 0 || user.contrasena.trim().length == 0) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "Credenciales inválidas"
            }));
        }
        console.log("in");
        db.usuarios.findOne({
            _id: req.params.email
        }, function(err, dbUser) {

            if (!dbUser) {
                res.end(JSON.stringify({
                        error: "Usuario inválido"
                    }));
            }


            pwdMgr.comparePassword(user.contrasena, dbUser.contrasena, function(err, isPasswordMatch) {


                console.log(isPasswordMatch)

                if (isPasswordMatch) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    // remove password hash before sending to the client
                    dbUser.contrasena = "";
                    res.end(JSON.stringify(dbUser));
                } else {
                    res.writeHead(403, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify({
                        error: "Contraseña Inválida"
                    }));
                }

            });
        });
        return next();
    });
};
