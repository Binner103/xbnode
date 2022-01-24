/// <reference types="qs" />
import { Request, Response, NextFunction } from "express";
import multer from "multer";
export declare const fileFilter: (fileTypes: string[]) => (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, file: Express.Multer.File, callback: multer.FileFilterCallback) => void;
export declare const fileInterceptor: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const fileProcessor: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
