import access from "../access-drive/data_access.js";

/**
 * Simple busqueda de ocurrencia dentro de la lista de atchivos
 * @param fileName: nombre del archivo que se quiere subir
 * @param filesFromPath: archivos "hijos" del padre de el archivo a subir
 * @returns {boolean}: verdadero si existe un archivo con el mismo nombre, falso en caso contrario
 */
function contains(fileName, filesFromPath) {
    for (const tmp of filesFromPath) {
        if (tmp.name === fileName) return true;
    }
    return false;
}

/**
 * Busca al padre del archivo a subir, chequea por elementos repetidos y realiza el insert
 * @param fileContainer:  Contiene todos los datos del archivo a subir
 * @param result:  Callback que se utiliza para informar el resultado de la operacion
 */
async function uploadFileService(fileContainer, result) {

    let parent =  await access.getParent(fileContainer.path, result);

    if (!parent)
        //Siempre debe tener un padre, si es vacio ocurrio algun error.
        return;

    fileContainer.parent = parent;

    let filesFromPath = await access.getFilesFromPath(parent.id, result);

    if (contains(fileContainer.name, filesFromPath)) {
        result("El archivo ya existe!");
        return;
    }

    access.insert(fileContainer, result);
}

export default {uploadFileService};
