export function unreachableEvent(x: never): never {
    throw new Error("Unreachable Store Event");
}