"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authServices", {
    enumerable: true,
    get: function() {
        return authServices;
    }
});
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
const _client = require("@prisma/client");
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _jwtHelper = require("../../../helpers/jwtHelper");
const _config = /*#__PURE__*/ _interop_require_default(require("../../../config/config"));
const _emailSender = /*#__PURE__*/ _interop_require_default(require("./emailSender"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _HTTPError = require("../../errors/HTTPError");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// const loginUser = async (payload: { email: string; password: string }) => {
//   console.log(payload);
//   // const userData = await prisma.user.findUniqueOrThrow({
//   //   where: {
//   //     email: payload.email,
//   //     status: UserStatus.ACTIVE,
//   //   },
//   // });
//   const userData = await prisma.user.findUnique({
//     where: {
//       email: payload.email,
//       status:UserStatus.ACTIVE
//     },
//   });
//   if(!userData){
//     throw new HTTPError(httpStatus.BAD_REQUEST,'Email is not valid')
//   }
//   const isCorrectPassword: boolean = await bcrypt.compare(
//     payload.password,
//     userData.password
//   );
//   if (!isCorrectPassword) {
//     throw new Error("Password is incorrect!");
//   }
//   const accessToken = jwtHelpers.generateToken(
//     {
//       userId: userData.id,
//       name: userData.name,
//       email: userData.email,
//       role: userData.role,
//       profilePhoto: userData.profilePhoto,
//     },
//     config.jwt.jwt_secret as Secret,
//     config.jwt.expires_in as string
//   );
//   const refreshToken = jwtHelpers.generateToken(
//     {
//       email: userData.email,
//       role: userData.role,
//     },
//     config.jwt.refresh_token_secret as Secret,
//     config.jwt.refresh_token_expires_in as string
//   );
//   return {
//     accessToken,
//     refreshToken,
//     passwordChangeRequired: userData.passwordChangeRequired,
//   };
// };
// const refreshToken = async (token: string) => {
//   let decodedData;
//   try {
//     decodedData = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_token_secret as Secret
//     );
//   } catch (err) {
//     throw new Error("You are not authorized!");
//   }
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: decodedData.email,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const accessToken = jwtHelpers.generateToken(
//     {
//       userId: userData.id,
//       name: userData.name,
//       email: userData.email,
//       role: userData.role,
//       profilePhoto: userData.profilePhoto,
//     },
//     config.jwt.jwt_secret as Secret,
//     config.jwt.expires_in as string
//   );
//   return {
//     accessToken,
//   };
// };
const loginUser = async (payload)=>{
    console.log(payload);
    const userData = await _prismaClient.default.user.findUnique({
        where: {
            email: payload.email,
            status: _client.UserStatus.ACTIVE
        }
    });
    if (!userData) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'Email is not valid');
    }
    const isCorrectPassword = await _bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Password is incorrect!');
    }
    const accessToken = _jwtHelper.jwtHelpers.generateToken({
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profilePhoto: userData.profilePhoto
    }, _config.default.jwt.jwt_secret, _config.default.jwt.expires_in);
    console.log(accessToken);
    const refreshToken = _jwtHelper.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    }, _config.default.jwt.refresh_token_secret, _config.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
        passwordChangeRequired: userData.passwordChangeRequired
    };
};
const refreshToken = async (token)=>{
    let decodedData;
    try {
        decodedData = _jwtHelper.jwtHelpers.verifyToken(token, _config.default.jwt.refresh_token_secret);
    } catch (err) {
        throw new Error('You are not authorized!');
    }
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email
        }
    });
    const accessToken = _jwtHelper.jwtHelpers.generateToken({
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profilePhoto: userData.profilePhoto
    }, _config.default.jwt.jwt_secret, _config.default.jwt.expires_in);
    return {
        accessToken
    };
};
const changePassword = async (user, payload)=>{
    //@ checking if the user exist
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: _client.UserStatus.ACTIVE
        }
    });
    //@ checking if the provided old password is correct
    const isCorrectPassword = await _bcrypt.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Password is incorrect!');
    }
    //@ hashing the new password
    const hashedPassword = await _bcrypt.hash(payload.newPassword, 10);
    //@ updating the password and also changing the passwordChangeRequired to false
    await _prismaClient.default.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
            passwordChangeRequired: false
        }
    });
    return {
        message: 'Password change successfully'
    };
};
const forgotPassword = async ({ email })=>{
    //@ checking if the user exist
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: email,
            status: _client.UserStatus.ACTIVE
        }
    });
    //@ creating a short time token
    const resetPasswordToken = _jwtHelper.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    }, _config.default.jwt.reset_password_token_secret, _config.default.jwt.reset_token_expires_in);
    //@ generating a link to send via email
    let link = `${_config.default.reset_pass_link}?Id=${userData.id}&token=${resetPasswordToken}`;
    //@ read HTML template file
    const htmlFilePath = _path.default.join(process.cwd(), '/src/templates/reset_pass_template.html');
    const htmlTemplate = _fs.default.readFileSync(htmlFilePath, 'utf8');
    const htmlContent = htmlTemplate.replace('{{resetPasswordLink}}', link);
    await (0, _emailSender.default)(userData.email, htmlContent);
};
const resetPassword = async (payload, token)=>{
    const isUserExist = await _prismaClient.default.user.findUnique({
        where: {
            id: payload.id,
            status: _client.UserStatus.ACTIVE
        }
    });
    if (!isUserExist) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'User not found!');
    }
    const isVarified = _jwtHelper.jwtHelpers.verifyToken(token, _config.default.jwt.reset_password_token_secret);
    if (!isVarified) {
        throw new _HTTPError.HTTPError(_httpstatus.default.UNAUTHORIZED, 'Something went wrong!');
    }
    const password = await _bcrypt.hash(payload.newPassword, Number(_config.default.bycrypt_salt_rounds));
    await _prismaClient.default.user.update({
        where: {
            id: payload.id
        },
        data: {
            password
        }
    });
};
const authServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
