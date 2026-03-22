import { useState, useEffect } from 'react';

export function useAppVersion() {
    const [version, setVersion] = useState({ version: '...', buildDate: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/version.json')
            .then(res => res.json())
            .then(data => {
                setVersion(data);
                setLoading(false);
            })
            .catch(() => {
                setVersion({ version: 'unknown', buildDate: '' });
                setLoading(false);
            });
    }, []);

    return { version: version.version, buildDate: version.buildDate, loading };
}
