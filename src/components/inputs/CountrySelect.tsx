"use client";
import useCountries, { FormattedCountryType } from "@/hooks/useCountries";
import { FC } from "react";
import Select from "react-select";

export interface CountrySelectProps {
  value: FormattedCountryType | null;
  onChange: (value: FormattedCountryType) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <Select
      options={getAll()}
      placeholder="Anywhere"
      value={value}
      onChange={(value) => onChange(value as FormattedCountryType)}
      formatOptionLabel={(option: FormattedCountryType) => {
        return (
          <div className="flex items-center gap-3">
            <div className="font-semibold">{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1 text-sm">
                {option.region}
              </span>
            </div>
          </div>
        );
      }}
      classNames={{
        control: () => `p-1 border-[1px]`,
        input: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: { ...theme.colors, primary: "#fa858d", primary25: "#ffe4e6" },
      })}
      isClearable
    />
  );
};

export default CountrySelect;
