// // import multer from 'multer';
// // import path from 'path';
// // import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// // import fs from 'fs';
// // import { UploadedFile } from '../app/interfaces/file';
// // const storage = multer.diskStorage({
// //    destination: function (req, file, cb) {
// //       cb(null, path.join(process.cwd(), '/uploads'));
// //    },
// //    filename: function (req, file, cb) {
// //       cb(null, file.originalname);
// //    },
// // });
// // const upload = multer({ storage: storage });
// // // cloudinary.config({
// // //    cloud_name: 'mizan-ph',
// // //    api_key: '448877366715569',
// // //    api_secret: 'BsXpD1ngFJYBfvlbKcgdPC4wUcc',
// // // });
// // cloudinary.config({
// //   cloud_name: 'sobuj-ph',
// //   api_key: '778578577171575',
// //   api_secret: 'FTTMW86uKvJEcg9BChI_KbWPl5M'
// // });
// // const saveToCloudinary = (
// //    file: UploadedFile
// // ): Promise<UploadApiResponse | undefined> => {
// //    return new Promise((resolve, reject) => {
// //       cloudinary.uploader.upload(
// //          file.path,
// //          { public_id: file.originalname },
// //          (error, result) => {
// //             fs.unlinkSync(file.path);
// //             if (error) {
// //                reject(error);
// //             } else {
// //                resolve(result);
// //             }
// //          }
// //       );
// //    });
// // };
// // export const fileUploader = {
// //    upload,
// //    saveToCloudinary,
// // };
// import { ICloudinaryResponse, IFile } from "./../app/interfaces/file";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({
//   cloud_name: "dr4tvtzda",
//   api_key: "993492718988977",
//   api_secret: "uysc2wfEkSOJqfbHw9o6WBl5bBk",
// });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// const uploadToCloudinary = async (
//   file: IFile
// ): Promise<ICloudinaryResponse | undefined> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       (error: Error, result: ICloudinaryResponse) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// };
// export const fileUpLoader = {
//   upload,
//   uploadToCloudinary,
// };
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileUploadHelper", {
    enumerable: true,
    get: function() {
        return FileUploadHelper;
    }
});
const _cloudinary = require("cloudinary");
const _multer = /*#__PURE__*/ _interop_require_default(require("multer"));
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
const _config = /*#__PURE__*/ _interop_require_default(require("../config/config"));
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
_cloudinary.v2.config({
    cloud_name: _config.default.cloudinary.cloud_name,
    api_key: _config.default.cloudinary.api_key,
    api_secret: _config.default.cloudinary.api_secret
});
const storage = _multer.default.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, _multer.default)({
    storage: storage
});
const uploadToCloudinary = async (file)=>{
    return new Promise((resolve, reject)=>{
        _cloudinary.v2.uploader.upload(file.path, (error, result)=>{
            _fs.unlinkSync(file.path);
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};
const FileUploadHelper = {
    uploadToCloudinary,
    upload
};
