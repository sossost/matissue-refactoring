"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../UI/Button";

type UserMenuProps = {
  currentUser?: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  return (
    <UserMenuDiv>
      {currentUser ? (
        <>
          <IconDiv
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/images/writeIcon.png"
              width={36}
              height={36}
              alt="write_icon"
              className=""
            />
          </IconDiv>
          <IconDiv onClick={() => {}}>
            <Image
              src="/images/profileIcon.png"
              width={36}
              height={36}
              alt="profile_icon"
            />
          </IconDiv>
        </>
      ) : (
        <>
          <LoginButton
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            로그인
          </LoginButton>
          <Button
            fullRound={true}
            isBgColor={true}
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            회원가입
          </Button>
        </>
      )}
    </UserMenuDiv>
  );
};

const UserMenuDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconDiv = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 100px;
  &:hover {
    background-color: #fbe2a1;
  }
`;

export default UserMenu;
