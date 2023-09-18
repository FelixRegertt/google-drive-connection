import formidable from "formidable";
import upload from "../service/upload.js";
import {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR} from "./constant.js";

/**
 * Permite dar la respuesta al cliente que realizo el post del archivo
 * @param res: response que envia el servidor http hacia el cliente
 * @param code: codigo HTTP que indica el resultado de las operaciones
 * @param message: simple mensaje para imprimir a "modo debug"
 */
function setResponse(res, code, message){
    console.log(message);
    res.writeHead(code);
    res.end();
}

/**
 * Ontiene los objetos asociados a los parametros que espera la funcion "uploadFile" para subir el archivo
 * @param files: Contiene los metadatos del archivo a subir
 * @param fields: contiene el archivo a subir
 * @returns: se retorna un arreglo de dimension 2, asociando <file, fields>
 */
function getParams(files, fields){
    let file = ''; let scope = '';

    try{
        const data = JSON.parse(fields['request']);

        file = {
            name: data.name,
            extension: data.extension,
            pathSource: files['data'].filepath
        };

        scope = {
            catedra: data.catedra,
            tipo: data.tipo,
            anioAcademico: data.anioAcademico
        };

    } catch (error){}

    return [file, scope];

}


/**
 * A partir de la request, obtiene el formdata que envia el cliente e intenta
 * subirlo a Google Drive a partir de la funcion "uploadFile"
 * @param req: peticion que llega al servidor que contiene el form-data que el cliente manda.
 * @param res: respuesta hacia el usuario luego de intentar subir el archivo.
 */
function sendForm(req, res){

    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (err) {
            setResponse(res, BAD_REQUEST, 'Error para interpretar formdata');
            return;
        }

        const params = getParams(files,fields);

        if(params[0] === '' && params[1] === ''){
            setResponse(res, BAD_REQUEST, 'Bad request');
            return;
        }

        upload.uploadFile(params[0], params[1], function(err, file) {
            if(err) {
                setResponse(res, INTERNAL_SERVER_ERROR, 'Error ' + err);
            } else {
                setResponse(res, CREATED, 'Archivo agregado ' + file.data.id);
            }
        });

    });
}

export default {sendForm, setResponse};
