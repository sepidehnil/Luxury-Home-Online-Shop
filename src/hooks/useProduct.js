import { useEffect, useState } from "react";
import { getAllProducts } from "../services/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useProduct(defaultPage = 1) {
  const [params, setParams] = useState({ page: defaultPage });
  // const queryClient = useQueryClient();
  const {
    isLoading,
    isFetching,
    refetch,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return { isLoading, refetch, isFetching, products, error, setParams };
}
