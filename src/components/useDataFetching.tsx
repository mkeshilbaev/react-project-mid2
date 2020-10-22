import { useEffect, useState } from "react";

interface Props {
    dataSource: string;
}

interface State {
    results?: any[];
    loading?: boolean;
    error?: any;
}

export default function useDataFetching({ dataSource }: Props): State {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetch(dataSource);
                const json = await data.json();

                if (json) {
                    setLoading(false);
                    setResults(json);
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }

        fetchData();
    }, [dataSource]);

    return {
        error,
        loading,
        results,
    };
}
