"use client";

import React, { useMemo } from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "./Modal";
import Heading from "../Heading";
import { SearchDataType, SearchSchema } from "@/lib/zodValidators";
import { generateSearchURL } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import useSearchModal from "@/hooks/useSearchModal";
import { formatISO } from "date-fns";
import Calendar from "@/components/inputs/Calendar";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);

  const {
    watch,
    handleSubmit,
    setValue,
    reset,
  } = useForm<SearchDataType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: SearchSchema.parse({
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    }),
  });

  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const dateRange = watch("dateRange");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);

  const handleCloseSearchModal = () => {
    searchModal.onClose();
    reset();
    router.refresh();
    setTimeout(() => setStep(STEPS.LOCATION), 1000);
  };

  // console.log({ location, guestCount, roomCount, bathroomCount, dateRange });

  const onSubmit: SubmitHandler<SearchDataType> = async (formData) => {
    if (!params) return;

    // check if we are on the last step
    if (step !== STEPS.INFO) return onNext();

    const searchUrl = generateSearchURL(params, {
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
      startDate: formatISO(dateRange.startDate),
      endDate: formatISO(dateRange.endDate),
    });

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(searchUrl);
  };

  const actionLabel = step === STEPS.INFO ? "Search" : "Next";
  const secondaryActionLabel = step === STEPS.LOCATION ? undefined : "Back";

  // a dynamic import for leaflet to avoid ssr
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  // body content for category step
  let bodyContent = (
    <>
      <Heading
        title="Where do you wanna go"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setCustomValue("location", value)}
      />
      <hr />
      {/* there is supposed to be a map here */}
      <div className="h-[35vh]">
        <Map center={location?.latlng} />
      </div>
    </>
  );

  // body content for info step
  if (step === STEPS.DATE) {
    bodyContent = (
      <>
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setCustomValue("dateRange", value.selection)}
        />
      </>
    );
  }

  // body content for info step
  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <Heading title="More Information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="how many guests are coming?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="how many rooms do you need?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="how many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </>
    );
  }

  return (
    <Modal
      size="lg"
      isOpen={searchModal.isOpen}
      title="Search Filters"
      action={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onClose={handleCloseSearchModal}
      body={
        <div className="flex flex-col gap-4 select-none">{bodyContent}</div>
      }
    />
  );
};

export default SearchModal;
