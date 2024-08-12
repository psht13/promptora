"use client";

import { Suspense } from "react";

import EditPrompt from "@components/EditPrompt";
import Loader from "@components/Loader";

const EditPromptPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPromptPage;
