import tw from "tailwind-styled-components";
import { Suspense } from "react";

import Banner from "@/src/components/main-page/Banner/Banner";
import MainMobileCategory from "@/src/components/main-page/mobile/MainMobileCategory";
import BestRecipes from "./components/BestRecipes";
import MainListingSkeleton from "@/src/components/listings/MainListingSkeleton";
import NewestRecipes from "./components/NewestRecipes";
import AloneRecipes from "./components/AloneRecipes";
import VegetarianRecipes from "./components/VegetarianRecipes";
import MainFridge from "@/src/components/main-page/MainFridge";
import MainVegetarian from "@/src/components/main-page/MainVegetarian";

const Home = async () => {
  return (
    <>
      <Banner />
      <MainContainer>
        <Suspense fallback={<></>}>
          <MainMobileCategory />
        </Suspense>

        <Suspense fallback={<MainListingSkeleton title="베스트 레시피" />}>
          {/* @ts-expect-error Async Server Component */}
          <BestRecipes />
        </Suspense>

        <Suspense>
          <MainFridge />
        </Suspense>

        <Suspense>
          {/* @ts-expect-error Async Server Component */}
          <AloneRecipes />
        </Suspense>

        <Suspense>
          <MainVegetarian />
        </Suspense>

        <Suspense fallback={<MainListingSkeleton title="최신 레시피" />}>
          {/* @ts-expect-error Async Server Component */}
          <NewestRecipes />
        </Suspense>
      </MainContainer>
    </>
  );
};

export default Home;

const MainContainer = tw.div`
  flex
  flex-col
  relative
  items-center
  w-full
  mx-auto

  md:py-5
  md:gap-2

  lg:gap-8
`;
