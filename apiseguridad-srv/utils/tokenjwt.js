const jwt = require("jsonwebtoken");
const constantes = require("../utils/constantes");
const PropertiesReader = require('properties-reader');
const appRoot = require('app-root-path');
const bundle = PropertiesReader(appRoot + '/i18n/Message.properties');
const util = require('util');

//generar Token JWT
exports.generarToken = function (oUserInfo) {
  let oConstantes = constantes.constantes();
  let oResponse = {};
  oResponse.oData = [];
  try {
    let oUsuario = oUserInfo;
    let token = jwt.sign(oUsuario, oConstantes.sClaveJwt, {
      expiresIn: oConstantes.sTiempoExpiracion,
    });

    oResponse.iCode = bundle.get('code.idf1');
    oResponse.sMessage = bundle.get('msj.idf1');
    oResponse.oData = token;
  } catch (e) {
    oResponse.iCode = bundle.get('code.idt6');
    oResponse.sMessage = util.format(bundle.get('msj.idt6'), e.toString());
  }
  return oResponse;
};
