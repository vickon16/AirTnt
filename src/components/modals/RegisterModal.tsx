"use client";

import React from "react";
import { API } from "@/lib/utils";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../ui/Button";
import { RegisterDataType, registerSchema } from "@/lib/zodValidators";
import { errorToast } from "@/lib/utils";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterDataType> = async (data) => {
    setIsLoading(true);
    try {
      await API.post(`/api/register`, data);
      router.refresh();
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      errorToast(error, "Failed to Register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      action={handleSubmit(onSubmit)}
      actionLabel="Continue"
      onClose={registerModal.onClose}
      body={
        <div className="flex flex-col gap-4">
          <Heading title="Welcome to AirTnT" subtitle="Create an Account" />
          <Input
            id="name"
            label="Name"
            type="text"
            disabled={isLoading}
            register={register("name")}
            errors={errors}
          />
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
            <span>Already have an account?</span>
            <span
              className="text-neutral-800 cursor-pointer hover:underline"
              onClick={() => {
                registerModal.onClose();
                loginModal.onOpen();
              }}
            >
              Login
            </span>
          </div>
        </div>
      }
    />
  );
};

export default RegisterModal;
