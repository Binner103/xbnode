/// <reference types="qs" />
import e from 'express';
export declare const index: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const NAME: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const store: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const update: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const destroy: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const storePostTag: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
export declare const destroyPostTag: (request: e.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: e.Response<any, Record<string, any>>, next: e.NextFunction) => Promise<void>;
