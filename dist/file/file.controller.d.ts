/// <reference types="qs" />
import e from "express";
export declare const store: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const serve: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
