"use client";

import { useState, useEffect, Suspense } from "react";

import PromptCard from "./PromptCard";
import Loader from "./Loader";
import Error from "./Error";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    (async () => {
      setError(false);
      try {
        const response = await fetch("/api/prompt", {
          method: "GET",
        });
        const data = await response.json();
        setAllPosts(data);
        setLoading(false);
      } catch (error) {
        if (errorCount < 5) {
          setErrorCount((prev) => prev + 1);
        } else {
          setLoading(false);
          setError(true);
        }
      }    
    })();
  }, [errorCount]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.creator.email) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a text, tag, username, or email"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <>
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
          {loading && <Loader />}
          {error && (
            <Error>Error loading all prompts. Please reload the page.</Error>
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
