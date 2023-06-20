"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import { axiosBase } from "@/app/api/axios";
import NonRecipe from "../UI/NonRecipe";
import { Recipe } from "@/app/types";
import ConfirmModal from "../UI/ConfirmModal";
import Pagination from "../pagination/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const UserRecipeCardList = ({
  ProfileUserRecipes,
}: {
  ProfileUserRecipes: Recipe[];
}) => {
  const client = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 16;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 현재 페이지 데이터
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const currentRecipe = isMobile
    ? ProfileUserRecipes?.slice(0, indexOfLastRecipe)
    : ProfileUserRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const fetchMoreRecipes = async () => {
    // 페이지 증가
    setCurrentPage((prev) => prev + 1);
    setIsLoading(true);

    // 데이터 로딩 시간 설정
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
  };

  const hasMore = currentPage * recipesPerPage < currentRecipe?.length;

  return (
    <RecipeListContainer>
      <RecipeHeading>
        {ProfileUserRecipes.user_nickname}님의 레시피
      </RecipeHeading>
      <RecipeHeadingCount>{currentRecipe?.length}</RecipeHeadingCount>
      {currentRecipe?.length === 0 ? (
        <NonRecipeMsg />
      ) : isMobile ? (
        <InfiniteScroll
          dataLength={currentRecipe?.length}
          next={fetchMoreRecipes}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.5}
          endMessage={
            <p
              style={{
                fontSize: "16px",
                textAlign: "center",
                margin: "2rem",
                color: "#F8B551",
              }}
            >
              <b>{`마지막 레시피 입니다 :)`}</b>
            </p>
          }
        >
          <RecipeList>
            {currentRecipe?.map((recipe: Recipe) => (
              <RecipeCardWrapper key={recipe.recipe_id}>
                <StyledRecipeCard recipe={recipe} />

                {/* <button onClick={() => handleOpenModal(recipe)}>
                  <ButtonDiv>
                    <DeleteButtonImage src="/images/x-box.svg" alt="X-box" />
                    <DeleteButtonMobile src="/images/final-x.svg" alt="X-box" />
                  </ButtonDiv>
                </button> */}
              </RecipeCardWrapper>
            ))}
          </RecipeList>
        </InfiniteScroll>
      ) : (
        <>
          <RecipeList>
            {currentRecipe
              ?.slice(0, recipesPerPage * currentPage)
              .map((recipe: Recipe) => (
                <RecipeCardWrapper key={recipe.recipe_id}>
                  <StyledRecipeCard recipe={recipe} />

                  {/* <button onClick={() => handleOpenModal(recipe)}>
                    <ButtonDiv>
                      <DeleteButtonImage src="/images/x-box.svg" alt="X-box" />
                      <DeleteButtonMobile
                        src="/images/final-x.svg"
                        alt="X-box"
                      />
                    </ButtonDiv>
                  </button> */}
                </RecipeCardWrapper>
              ))}
          </RecipeList>
          {!isMobile && (
            <PaginationComponent
              recipesPerPage={recipesPerPage}
              totalRecipes={currentRecipe?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
      {/* {isModalOpen && (
        <StyledConfirmModal
          icon={<AlertImage src="/images/alert.png" alt="alert" />}
          message="레시피를 삭제하시겠습니까?"
          onConfirm={handleDeleteRecipe}
          onCancel={handleCloseModal}
        />
      )} */}
    </RecipeListContainer>
  );
};

const RecipeListContainer = styled.div`
  width: 100%;
  margin-top: 1.8rem;
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 16rem;
  }
`;

const RecipeHeading = styled.span`
  font-size: 15px;
  letter-spacing: 0.01em;
  margin: 0 0.3rem 0 1rem;
  font-weight: 600;
  color: #4f3d21;
  @media (min-width: 1024px) {
    font-size: 18px;
    margin: 0 0.5rem 0 1rem;
  }
`;

const RecipeHeadingCount = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #545454;
  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;

const RecipeList = styled.div`
  display: grid;
  margin-top: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 1.5rem;
  }
`;

const RecipeCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledRecipeCard = styled(RecipeCard)``;

const DeleteButtonImage = styled.img`
  @media (min-width: 1024px) {
    position: absolute;
    transition: transform 0.1s ease-in-out;
    top: 25rem;
    right: 0.7rem;
    width: 1.8rem;
    height: 1.8rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:hover {
      transform: scale(1.2);
    }
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const DeleteButtonMobile = styled.img`
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  top: 0.7rem;
  right: 0.7rem;
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.1s ease-in-out;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const NonRecipeMsg = styled(NonRecipe)``;
const StyledConfirmModal = styled(ConfirmModal)``;
const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const PaginationComponent = styled(Pagination)`
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
`;

export default UserRecipeCardList;
