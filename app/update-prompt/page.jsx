"use client";

import { Suspense } from "react";

import EditPrompt from "@components/EditPrompt";

const EditPromptPage = () => {
  return (
    <Suspense>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPromptPage;
