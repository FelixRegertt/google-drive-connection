import root from "app-root-path";
import admin from "firebase-admin";
import fs from "fs";

/**
 * Se obtiene una conexion con los servicios de Firebase, correspondiente al login de los usuarios
 */

const credentials = root.path + "/resources/firebase-adminsdk.json";

fs.readFile(credentials,
    (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);

        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(content))
        });

    });


export { admin as firebaseConnection };

