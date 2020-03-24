import React from "react";
import { ENTIRE_STORE_LISTENERS } from "./ENTIRE_STORE_LISTENERS";
import { IStateSetters } from "./types";
export default class Eventing<T> {
    stateSetters: IStateSetters<T>;
    subscribe: <K extends keyof T>(listener: React.Dispatch<React.SetStateAction<T>>, subProps: typeof ENTIRE_STORE_LISTENERS | K | K[]) => void;
    unsubscribe: <K extends keyof T>(listener: React.Dispatch<React.SetStateAction<T>>, unsubscribableProps: Set<typeof ENTIRE_STORE_LISTENERS | K | K[]>) => void;
    trigger: <K extends keyof T>(prop: K, data: T) => void;
}
//# sourceMappingURL=Eventing.d.ts.map