interface SignTokenOptions {
    payload?: any;
}
export declare const signToken: (options: SignTokenOptions) => string;
interface PossessOptions {
    resourceId: number;
    resourceType: string;
    userId: number;
}
export declare const possess: (options: PossessOptions) => Promise<boolean>;
export {};
