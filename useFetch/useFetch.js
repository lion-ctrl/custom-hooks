import { useEffect, useRef, useState } from 'react';

const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const res = await fetch(url);
        if (!res.ok) throw res;
        const data = await res.json();
        setTimeout(() => {
          if (isMounted.current) {
            setState({ loading: false, error: false, data });
          }
        }, 3000);
      } catch (err) {
        const message = err.statusText || 'Ocurrio un error';
        setState({
          data: null,
          loading: false,
          error: { message, status: err.status ?? 404 },
        });
      }
    })();
  }, [url]);

  return state;
};

export default useFetch;
