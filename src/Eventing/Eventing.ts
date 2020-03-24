import React, {SetStateAction} from "react";
import {ENTIRE_STORE_LISTENERS} from "./ENTIRE_STORE_LISTENERS";
import {IStateSetters, StateSetter} from "./types";

export default class Eventing<T> {
    public stateSetters: IStateSetters<T> = {} as IStateSetters<T>;

    public subscribe = <K extends keyof T>(listener: StateSetter<T>, subProps: K | K[] | typeof ENTIRE_STORE_LISTENERS): void => {
        if (subProps instanceof Array)
            subProps.forEach(port => this.subscribe(listener, port));
        else {
            const portionListeners = this.stateSetters[subProps] || new Set<StateSetter<T>>();
            portionListeners.add(listener);
            this.stateSetters[subProps] = portionListeners;
        }
    };


    public unsubscribe = <K extends keyof T>(listener: StateSetter<T>, unsubscribableProps: Set<K | K[] | typeof ENTIRE_STORE_LISTENERS>): void => {
        unsubscribableProps.forEach(prop => {
            if (prop instanceof Array)
                prop.forEach(p => this.stateSetters[p].delete(listener));
            else
                this.stateSetters[prop].delete(listener)
        });
    };

    public trigger = <K extends keyof T>(prop: K, data: T): void => {
        this.stateSetters[prop]?.forEach(ln => ln(data));
        this.stateSetters[ENTIRE_STORE_LISTENERS]?.forEach(ln => ln(data));
    };
}