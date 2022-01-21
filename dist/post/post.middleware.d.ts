/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
export declare const sort: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
export declare const filter: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
