import googleDriveService from "./service.js";
import fs from "fs";

/**
 * Crea el contenedor para el archivo a partir de los datos dados por el usuario e intenta subir el archivo
 * @param file: contiene los datos propios del archivo
 * @param scope: contiene los metadatos respecto al contexto academico del archivo
 * @param result: callback que se utiliza para informar el resultado de la operacion.
 */
function uploadFile(file, scope, result) {
    try {
        let media = {
            mimeType: file.extension,
            body: fs.createReadStream(file.pathSource)
        };

        const fileContainer = {
            name: file.name,
            media: media,
            path:
                "My Drive/ingenieria de sistemas/" +
                scope.anioAcademico.toLowerCase() +
                "/" +
                scope.catedra.toLowerCase() +
                "/" +
                scope.tipo.toLowerCase(),
        };

        const isEmptyMedia = Object.values(media).every((x) => x === null);
        const isEmptyFile = Object.values(fileContainer).every((x) => x === null || x === "");

        if (isEmptyMedia || isEmptyFile) {
            result("Los campos no pueden ser vacios!");
            return;
        }
        googleDriveService.uploadFileService(fileContainer, result);

    } catch (error) {
        result(error);
    }
}

export default {uploadFile};
