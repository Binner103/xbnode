/// <reference types="qs" />
import { Request, Response, NextFunction } from "express";
export declare const store: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
export declare const serve: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
export declare const metadata: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
