import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const revalidate = 0; //revalidate api every 0 second
export const GET = async (req) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);

    return new Response("Failed to fetch all prompts.", { status: 500 });
  }
};
