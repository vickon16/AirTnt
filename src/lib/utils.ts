import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";
import queryString from "query-string";
import { NextResponse } from "next/server";

export const API = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const stringCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateSearchURL = (
  params: ReadonlyURLSearchParams,
  paramsObject: any
) => {
  // convert the search parameters to object
  const currentQuery = queryString.parse(params.toString());

  // update them based on the newest category.
  const updatedQuery: any = {
    ...currentQuery,
    ...paramsObject,
  };

  // delete query, if it already exists
  Object.keys(paramsObject).map((key) => {
    const paramsKey =
      typeof paramsObject[key] === "string"
        ? paramsObject[key].toLowerCase()
        : paramsObject[key];

    if (params.get(key) === paramsKey) {
      delete updatedQuery[key];
    }
  });

  // stringify the url
  const url = queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: updatedQuery,
    },
    { skipNull: true }
  );

  return url;
};

export const errorToast = (error: unknown, message: string) => {
  if (error instanceof z.ZodError) {
    return toast.error(`${message}. ${error.message}`);
  }
  if (error instanceof AxiosError) {
    return toast.error(`${message}. ${error.response?.data || error.message}`);
  }
  if (error instanceof Error) {
    return toast.error(`${error.message}`);
  }
  return toast.error(message);
};

export const errorResponse = (
  error: unknown,
  message: string,
  status: number
) => {
  if (error instanceof z.ZodError) {
    return new Response(`${message}. ${error.message}`, { status });
  }
  if (error instanceof AxiosError) {
    return new Response(
      `${message}. ${error.response?.data || error.message}`,
      { status }
    );
  }
  if (error instanceof Error) {
    return new Response(`${error.message}`, { status });
  }
  return new Response(`Internal Server Error`, { status: 500 });
};
