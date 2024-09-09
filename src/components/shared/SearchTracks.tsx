"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";

const SearchTracks = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasFocusInput, setHasFocusInput] = useState(false);

  useEffect(() => {
    if (hasFocusInput) {
      if (searchQuery) {
        router.push(`/search/${searchQuery}`);
      } else {
        router.push(`/search`);
      }
    }
  }, [searchQuery]);

  return (
    <>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onFocus={() => {
          setHasFocusInput(true);
          router.push("/search");
        }}
      />
    </>
  );
};

export default SearchTracks;
