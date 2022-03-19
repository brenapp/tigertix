import React, { ReactNode, useEffect, useState } from "react";
import { Spinner } from ".";

export interface LoadingProps<R> {
    error?: React.FC;
    loading?: React.FC;
    render: React.FC<{ data: R }>;

    promise: Promise<R>;
}

const LoadingDefaults = {
    error: () => <p>Something went wrong!</p>,
    loading: () => <div className="flex justify-center">
        <Spinner />
    </div>,
};

const Loading = <R,>(props: LoadingProps<R>) => {
    const [loading, setLoading] = useState(true);
    const [errored, setErrored] = useState(false);
    const [result, setResult] = useState<R | null>(null);

    useEffect(() => {
        props.promise
            .then((result) => setResult(result))
            .catch(() => setErrored(true))
            .finally(() => setLoading(false));
    });

    const Error = props.error ?? LoadingDefaults.error;
    const Loading = props.loading ?? LoadingDefaults.loading;
    const Render = props.render;

    if (errored) {
        return <Error />;
    }

    if (loading) {
        return <Loading />;
    } else {
        return <Render data={result as R} />;
    }
};

export default Loading;
