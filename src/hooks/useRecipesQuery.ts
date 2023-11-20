import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types";
import { queryKey } from "../ReactQuery/queryKey";
import {
  getRecipesByLastest,
  getRecipesByPopularity,
  getRecipesBySingle,
} from "../app/api/recipe";
import { getRequest } from "../app/api/utils/getRequest";

export const useBestRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.bestRecipes], getRecipesByPopularity);

  return { data, isLoading, isError };
};

export const useNewestRecipesQuery = () => {
  const { data = [] } = useQuery<Recipe[]>(
    [queryKey.newestRecipes],
    getRecipesByLastest
  );

  return data;
};

export const useSingleRecipesQuery = () => {
  const fallback = [] as Recipe[];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<Recipe[]>([queryKey.singleRecipes], getRecipesBySingle);

  return { data, isLoading, isError };
};

export const useVegetarianRecipesQuery = (page: number, limit: number) => {
  const { data: vegetarianRecipes = [] } = useQuery<Recipe[]>(
    [queryKey.singleRecipes],
    () => getRequest({ url: `recipes/vegetarian?page=${page}&limit=${limit}` })
  );

  return { vegetarianRecipes };
};
