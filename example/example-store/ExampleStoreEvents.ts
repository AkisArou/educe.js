import {StoreEvents} from "../../educe/Store/types";

export enum ExampleStoreEventType {
    Add,
    Deduct
}

export type ExampleStoreEvents = StoreEvents<{
    CountAddEvent: { type: ExampleStoreEventType.Add, valueToAdd: number; }
    CountDeductEvent: { type: ExampleStoreEventType.Deduct, valueToDeduct: number; }
}>
