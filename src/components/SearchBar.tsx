import { Skeleton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { searchMovie } from "../api";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isTyping = search.replace(/\s+/, "").length > 0;

  useEffect(() => {
    if (isTyping) {
      setLoading(true);
      const getData = setTimeout(async () => {
        setOptions(await searchMovie(search));
        setLoading(false);
      }, 1000);

      return () => {
        clearTimeout(getData);
        setLoading(false);
      };
    } else {
      setOptions([]);
    }
  }, [search, isTyping]);

  const handleClick = (search: string): void => {
    navigate("/search", { state: search });
    setSearch("");
    setLoading(false);
    setOptions([]);
  };

  return (
    <div className="col-xl-3 col-lg-3">
      <div className="search">
        <input
          type="search"
          value={search}
          className={isTyping ? "typing" : null}
          placeholder="Search Movie"
          onChange={(e) => setSearch(e.target.value)}
        />
        {isTyping && (
          <ul className="search-result">
            {options &&
              loading === false &&
              options.slice(0, 2).map((option, key) => (
                <li key={key}>
                  <div onClick={() => handleClick(option.title)}>
                    <div className="search-result-item">
                      <span className="title">{option.title}</span>
                    </div>
                  </div>
                </li>
              ))}
            {options.length > 0 && !loading && (
              <li>
                <div className="show-more" onClick={() => handleClick(search)}>Show More</div>
              </li>
            )}
            {loading &&
              Array(3)
                .fill([""])
                .map((item, key) => (
                  <Skeleton
                    height={10}
                    sx={{ padding: "20px", margin: "0 20px" }}
                    key={key}
                  />
                ))}
            {options.length === 0 && loading === false && (
              <div className="result-not-found">
                No results found for "{search}"
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
