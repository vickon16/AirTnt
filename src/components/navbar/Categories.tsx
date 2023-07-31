"use client";

import React, { useEffect, useState } from "react";
import Container from "../Container";
import { categories } from "@/data/categories";
import CategoryBox from "../CategoryBox";
import { Carousel } from "@mantine/carousel";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryLoader from "../loaders/CategoryLoader";

const Categories = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const params = useSearchParams();
  const category = params?.get("category") || "trending";
  const pathname = usePathname();


  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-5 flex items-center overflow-hidden">
        <>
          {!hasMounted ? (
            categories.map((item) => (
              <CategoryLoader key={item.id} />
            ))
          ) : (
            <Carousel
              dragFree
              slideSize="3%"
              slideGap="md"
              height={85}
              align="start"
              maw="95%"
              className="px-8 [&_button.mantine-UnstyledButton-root]:-mt-14"
            >
              {categories.map((item) => (
                <Carousel.Slide key={item.id}>
                  <CategoryBox
                    item={item}
                    selected={category === item.label.toLowerCase()}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
        </>
      </div>
    </Container>
  );
};

export default Categories;
