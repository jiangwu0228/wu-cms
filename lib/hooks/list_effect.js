import { omitBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export function useListEffect(
  apiFn: (req) => Promise,
  sourceKey: keyof,
  onlyFresh = true,
  params = null
) {
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({ limit: 20, page: 1 });
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const request = useCallback(apiFn, []);
  const stringParams = JSON.stringify(params || {});

  useEffect(() => {
    const req = omitBy(
      { ...paginator, ...(params || {}) },
      (item => item === '' || item === null
    ));

    setLoading(true);

    request(req).then((res) => {
      const { data: newData } = res;
      const fresh = (newData[sourceKey as string] as unknown) as U[];
      const source = onlyFresh ? fresh : [...data, ...fresh];

      setData(source);
      setTotal(newData.total);
      setHasMore(
        onlyFresh ? !!source.length && source.length < newData.total : newData.total > source.length
      );
      setLoading(false);
    });
  }, [paginator, stringParams]);

  return {
    data,
    hasMore,
    paginator,
    total,
    loading,
    setPaginator,
    setData,
    setTotal,
    setLoading,
  };
}