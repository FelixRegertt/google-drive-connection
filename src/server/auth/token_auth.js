import {firebaseConnection} from "./firebase_config.js";

/**
 * Verificamos el token dado por el usuario, utilizando la conexion con Firebase
 * @param idToken: token dado por el ususario que quiere subir el archivo
 * @returns {Promise}: Resultado de la verificacion del token
 */
function authenticate(idToken){

    return new Promise(
        (resolve, reject) => {

            firebaseConnection.auth().verifyIdToken(idToken).then(
                (decodeToken) => {
                    resolve(decodeToken);
                }
            ).catch(
                (error) => { reject(error)}
            );

        });
}

export default {authenticate};



