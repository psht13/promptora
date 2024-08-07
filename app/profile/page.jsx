"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();

        setMyPosts(data);
        setLoading(false);
      }
    };

    if (status !== "loading") {
      fetchPosts();
    }
  }, [session, status]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((p) => p._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!session) {
    return (
      <div className="text-md font-sans">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Here, you can edit and delete your own prompts to make them even more engaging and tailored to your unique style."
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {loading && <div className="text-md font-sans">Loading...</div>}
    </>
  );
};

export default MyProfile;
