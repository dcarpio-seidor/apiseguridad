/**
 * @description para validar campos nulos o vacios
 * @creation David Villanueva 22/08/2020
 * @update
 */
exports.validaUndefined = function (sCampo) {
  if (sCampo === undefined) {
    return false;
  }
  if (sCampo === null) {
    return false;
  }
  if (sCampo === "") {
    return false;
  }
  return true;
};

/**
 * @description Función para obtener el error
 * @creation David Villanueva 09/08/2020
 * @update
 */
exports.customError = function (error) {
  let oError = {};
  let aMessage = error.message.split("||");
  if (aMessage.length != 1) {
    oError.iCode = parseInt(aMessage[0], 10);
    oError.sMessage = aMessage[1];
  }

  return oError;
};

/**
 * @description Función para devoler el objeto de respuesta
 * @creation David Villanueva 09/08/2020
 * @update
 */
exports.customResponse = function (oParam) {
  var oResponse = {};
  oResponse.oAuditResponse = {};
  oResponse.oAuditResponse.code = oParam.iCode;
  oResponse.oAuditResponse.message = oParam.sMessage;
  oResponse.oAuditResponse.idtransaccion = oParam.idtransaccion;
  oResponse.oDataResponse = oParam.oData;

  return oResponse;
};

/**
 * @description Función para devolver el filtro a los odata service
 * @creation David Villanueva 27/08/2020
 * @update
 */
exports.formatoFiltroOdata = function (sFiltro) {
  var sFiltroNuevo = "";
  if (sFiltro !== undefined && sFiltro !== null && sFiltro !== "") {
    sFiltroNuevo = sFiltro.replace(/ /g, "%20").replace(/'/g, "%27");
  } else {
    sFiltroNuevo = sFiltro;
  }
  return sFiltroNuevo;
};

/**
 * @description Función para obtener formato de fecha segun formato: dd/mm/yyyy ---- dd/mm/yyyy h:m:s
 * @creation David Villanueva 09/08/2020
 * @update
 */
function formatDate(date, format) {
  var nuevoFormat = "";
  if (date !== undefined && date !== null) {
    if (date.getFullYear() !== -1) {
      var dd = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
      var mm =
        date.getMonth() + 1 <= 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var hour = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
      var minut =
        date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
      var segund =
        date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds();
      nuevoFormat = format
        .replace("dd", dd)
        .replace("mm", mm)
        .replace("yyyy", yyyy)
        .replace("h", hour)
        .replace("m", minut)
        .replace("s", segund);
    }
  }
  return nuevoFormat;
}

exports.generarDate = function (fecha) {
  var nuevaFecha = "";
  if (fecha === undefined || fecha === null || fecha === "") {
    var iTiempoServidor = -5;
    var FechaInicio = new Date();
    FechaInicio.setHours(FechaInicio.getHours() + iTiempoServidor);
    nuevaFecha = formatDate(FechaInicio, "yyyy-mm-ddTh:m:sZ");
  } else {
    nuevaFecha = fecha;
  }
  return nuevaFecha;
};
