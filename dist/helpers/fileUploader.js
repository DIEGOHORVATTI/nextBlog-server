"use strict";
// // import multer from 'multer';
// // import path from 'path';
// // import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// // import fs from 'fs';
// // import { UploadedFile } from '../app/interfaces/file';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadHelper = void 0;
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
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const config_1 = __importDefault(require("../config/config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloud_name,
    api_key: config_1.default.cloudinary.api_key,
    api_secret: config_1.default.cloudinary.api_secret,
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
            fs.unlinkSync(file.path);
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.FileUploadHelper = {
    uploadToCloudinary,
    upload,
};
