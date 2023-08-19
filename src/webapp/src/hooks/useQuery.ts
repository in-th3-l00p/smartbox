import {useEffect, useState} from "react";

export default function useQuery(queryFunction: () => Promise<void>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    queryFunction()
      .then(() => setLoading(false))
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [])

  return [loading, error];
}
