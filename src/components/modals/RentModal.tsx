"use client";

import React, { useMemo } from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { RentDataType, RentSchema } from "@/lib/zodValidators";
import { errorToast } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { API } from "@/lib/utils";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setError,
  } = useForm<RentDataType>({
    resolver: zodResolver(RentSchema),
    defaultValues: RentSchema.parse({
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      imageSrc: "",
      title: "",
      description: "",
    }),
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const title = watch("title");
  const description = watch("description");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);
  const handleCloseRentModal = () => {
    rentModal.onClose();
    reset();
    router.refresh();
    setTimeout(() => setStep(STEPS.CATEGORY), 1000);
  };

  const onSubmit: SubmitHandler<RentDataType> = async (formData) => {
    if (step === STEPS.CATEGORY) {
      if (!category) return toast.error("Please pick a category");
    }
    if (step === STEPS.LOCATION) {
      if (!location) return toast.error("Please select your location");
    }
    if (step === STEPS.IMAGES) {
      if (!imageSrc) return toast.error("Please add your photo");
    }
    if (step === STEPS.DESCRIPTION) {
      if (!title)
        return setError("title", {
          message: "Please fill out the field",
        });
      if (!description)
        return setError("description", {
          message: "Please fill out the field",
        });
    }
    // check if we are on the last step
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);
    try {
      await API.post("/api/listings", formData);
      toast.success("Listing Created Successfully!");
      handleCloseRentModal();
    } catch (error) {
      errorToast(error, "Failed to create Rent data!");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = step === STEPS.PRICE ? "Create" : "Next";
  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : "Back";

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
        title="Pick a category"
        subtitle="Which of these best describes your place"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50svh] overflow-y-auto px-2 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        {categories.map((item) => (
          <div key={item.id} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label.toLowerCase()}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </>
  );

  // body content for location step
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <>
        <Heading
          title="Your Location"
          subtitle="Where is your place located?"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        {/* there is supposed to be a map here */}
        <div className="h-[35vh]">
          <Map center={location?.latlng} />
        </div>
      </>
    );
  }

  // body content for info step
  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <Heading title="Share some basics about your place" />
        <Counter
          title="Guests"
          subtitle="how many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="how many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="how many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </>
    );
  }

  // body content for images step
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </>
    );
  }

  // body content for description step
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <>
        <Heading
          title="How would you describe your place"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          type="text"
          disabled={isLoading}
          register={register("title")}
          errors={errors}
        />
        <Input
          id="description"
          label="Description"
          type="text"
          disabled={isLoading}
          register={register("description")}
          errors={errors}
        />
      </>
    );
  }

  // body content for description step
  if (step === STEPS.PRICE) {
    bodyContent = (
      <>
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          formatPrice
          disabled={isLoading}
          register={register("price", {
            valueAsNumber: true,
            required: "Price is required",
          })}
          errors={errors}
        />
      </>
    );
  }

  return (
    <Modal
      size="lg"
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="AirTnt your home."
      action={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onClose={handleCloseRentModal}
      body={
        <div className="flex flex-col gap-4 select-none">{bodyContent}</div>
      }
    />
  );
};

export default RentModal;
