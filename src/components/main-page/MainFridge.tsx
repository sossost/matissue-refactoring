"use client";

import styled from "styled-components";
import { Recipe } from "@/src/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/src/store/darkModeAtom";
import { useNewestRecipesQuery } from "@/src/hooks/useRecipesQuery";
import { RecipeContainer } from "@/src/styles/main/main.style";

import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import LargeRecipeCard from "../recipe-card/main/MainLargeRecipeCard";
import MainTitleBox from "./MainTitleBox";
import useIngredientFilter from "./hooks/useIngredientFilter";

const MainFridge = () => {
  const fridgeRecipes = useNewestRecipesQuery();
  const { filteredRecipes, IngredientList } = useIngredientFilter(
    fridgeRecipes.data
  );

  const isDarkMode = useRecoilValue(darkModeAtom);

  if (fridgeRecipes.isLoading) {
    return <LoadingRecipe />;
  }

  if (fridgeRecipes.isError) {
    return <NonDataCrying />;
  }

  if (fridgeRecipes.data.length === 0) {
    return <NonRecipeCrying />;
  }

  return (
    <MainFridgeContainer isDarkMode={isDarkMode}>
      <MainTitleBox
        title="당신을 위한 냉장고 털이 레시피"
        subTitle="냉장고 속 재료로 손쉽게 훌륭한 요리를 선보이세요"
      />
      <IngredientList />
      <RecipeContainer>
        {filteredRecipes?.slice(0, 3).map((item: Recipe) => (
          <LargeRecipeCard key={item.recipe_id} recipe={item} />
        ))}
      </RecipeContainer>
    </MainFridgeContainer>
  );
};

export default MainFridge;

const MainFridgeContainer = styled.div<{ isDarkMode: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: ${(props) =>
      props.isDarkMode ? props.theme.navy : "#fff9de"};
  }
`;
