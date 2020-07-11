import React from "react";
import { ENTIRE_STATE } from "../Eventing/ENTIRE_STATE";
import { IStateSetters } from "./types";
export default class Eventing<T> {
    stateSetters: IStateSetters<T>;
    subscribe: <K extends keyof T>(subProps: typeof ENTIRE_STATE | K | K[], listener: React.Dispatch<React.SetStateAction<T>>) => void;
    unsubscribe: <K extends keyof T>(unsubscribableProps: Set<typeof ENTIRE_STATE | K | K[]>, listener: React.Dispatch<React.SetStateAction<T>>) => void;
    trigger: <K extends keyof T>(prop: K, data: T) => void;
}
//# sourceMappingURL=Eventing.d.ts.map