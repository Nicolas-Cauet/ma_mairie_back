npm init -y;
npm i dotenv express pg;
mkdir app docs public;
touch .env .envexemple .gitignore index.js;
cd app;
mkdir controllers models routers handlers;
cd handlers;
touch APIError.js httpStatusCodes.js routerWrapper.js;
cd ../models;
touch dataMapper.js dbClient.js;
cd ../routers;
touch router.js;
cd ../..;
echo "require('dotenv').config();
const express = require('express');

const router = require('./app/routers/router.js');

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
    console.log('Listening on http://localhost:' + PORT);
});" > index.js;
echo "node_modules
.env" > .gitignore;
echo "PGUSER=
PGDATABASE=
PGHOST=
PGPASSWORD=
PORT=" > .env
cd app/routers;
echo "const express = require('express');
const router = express.Router();



module.exports = router;" > router.js;
cd ../models;
echo "require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});

module.exports = client;" > dbClient.js;
echo "const client = require('./dbClient.js');

const datamapper = {
    
}

module.exports = datamapper;" > dataMapper.js;
cd ../handlers;
echo "const routerWrapper = (method)=>{
    return async (req,res,next)=>{
        try{
            await method(req,res,next);
        }
        catch(err){
            next(err);
        }
    }
};

module.exports = routerWrapper;" > routerWrapper.js;
echo "const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
};
   
module.exports = httpStatusCodes;"  > httpStatusCodes.js;
echo "const { appendFile } = require('fs/promises');
const path = require(path);

class APIError extends Error{
    constructor(message,url,status = 500){
        super(message); // super appelle le constructeur du parent
        this.status = status;
        this.url = url;
    }

    /**
     * Méthode pour logger les erreurs
     * @param {string} message d'erreur
     * @returns 
     */
    async log(){
        // Gestion de l'affichage de l'erreur dans la console - instantanéité
        console.error(this.url,this.message,new Date());

        // Gestion des fichiers de log - historique
        const logPath = path.resolve(__dirname,);
        const fileName = new Date().toISOString().split('T')[0]+'.csv';

        /* converti notre data en un format avec heure et minute (trouvé sur stackoverflow) */


        const result = await appendFile(logPath+'/'+fileName, new Date().toLocaleTimeString() + ',' + this.url + ',' + this.message + '\n');
    }
};

module.exports = APIError;" > APIError.js;


