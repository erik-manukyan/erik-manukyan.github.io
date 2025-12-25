import { useState, useEffect } from "react";

let cache = null;
let inflight = null;

export function useProperties() {
  const [properties, setProperties] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (cache) {
      // already cached — initial state already set from cache
      return;
    }

    if (!inflight) {
      inflight = fetch("/properties.json")
        .then((r) => r.json())
        .then((json) => {
          cache = json.properties || [];
          inflight = null;
          return cache;
        })
        .catch((e) => {
          inflight = null;
          throw e;
        });
    }

    inflight
      .then((props) => {
        if (!mounted) return;
        setProperties(props);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { properties, loading, error };
}
