import {useEffect, useState} from "react";
import {Stream} from "../Stream/Stream";

function useStream<S>(stream: Stream<S>): S {
    const [data, setState] = useState<S>(() => stream.getValue());

    useEffect(() => {
        stream.subscribe(setState);
        return () => stream.unsubscribe(setState);
    }, [stream]);

    return data;
}

export {useStream};
