import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const promtps = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(promtps), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
