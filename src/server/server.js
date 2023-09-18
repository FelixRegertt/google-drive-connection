import http from 'http'
import tokenAuth from "./auth/token_auth.js";
import controller from "./controller.js";
import {FORBIDDEN} from "./constant.js";


/**
 * Se verifica el token del usuario que quire realizar el POST del archivo.
 * y se envia el archivo para agregarlo a Google Drive a partir de "sendForm"
 * @param req: peticion que llega al servidor que contiene el form-data que el cliente manda.
 * @param res: respuesta hacia el usuario luego de intentar subir el archivo.
 */
const requestListener = function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        const tokenRequest = req.headers.authorization;


        if (tokenRequest.startsWith("Bearer ")){
            const token = tokenRequest.substring(7, tokenRequest.length);

            tokenAuth.authenticate(token).then(() =>{
                controller.sendForm(req, res);

            }).catch(()=>{
                controller.setResponse(res, FORBIDDEN, 'Error de token');
            });
        } else {
            controller.setResponse(res, FORBIDDEN, 'Error de token');
        }
    }else{
        res.end('Trabajo sistemas operativos');
    }

}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);