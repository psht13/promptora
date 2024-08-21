"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Loader from "@components/Loader";
import Error from "@components/Error";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setError(false);
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();

        setUserPosts(data);
        setLoading(false);
      } catch (error) {
        if (errorCount < 5) {
          setErrorCount((prev) => prev + 1);
        } else {
          setError(true);
          setLoading(false);
        }
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id, errorCount]);

  return (
    <>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
      {loading && <Loader />}
      {error && (
        <Error>
          Error loading personalized prompts. Please reload the page.
        </Error>
      )}
    </>
  );
};

export default UserProfile;
