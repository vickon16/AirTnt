"use client";

import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../ui/Button";
import { LoginDataType, LoginSchema } from "@/lib/zodValidators";
import { errorToast } from "@/lib/utils";
import useRegisterModal from "@/hooks/useRegisterModal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginDataType> = async (data) => {
    setIsLoading(true);
    try {
      await signIn("credentials", data);
      
      toast.success("Successfully logged in");
      router.refresh();
      loginModal.onClose();
    } catch (error) {
      errorToast(error, "Failed to Login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      action={handleSubmit(onSubmit)}
      actionLabel="Continue"
      onClose={loginModal.onClose}
      body={
        <div className="flex flex-col gap-4">
          <Heading title="Welcome Back!" subtitle="Log into your account" />
          <Input
            id="email"
            label="Email"
            type="email"
            disabled={isLoading}
            register={register("email")}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register("password")}
            errors={errors}
          />
        </div>
      }
      footer={
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            variant="outline"
            icon={FcGoogle}
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>
          <Button
            variant="outline"
            icon={AiFillGithub}
            onClick={() => signIn("github")}
          >
            Continue with Github
          </Button>
          <div className="text-neutral-500 mt-4 font-light flex items-center justify-center gap-2">
            <span>{"Don't"} have an account?</span>
            <span
              className="text-neutral-800 cursor-pointer hover:underline"
              onClick={() => {
                loginModal.onClose();
                registerModal.onOpen();
              }}
            >
              Register
            </span>
          </div>
        </div>
      }
    />
  );
};

export default LoginModal;
