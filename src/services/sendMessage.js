import axios from "axios";

export async function sendMessage({ name, artist, music }) {
  try {
    const response = await axios.post("http://165.232.142.145:3339/telegram", {
      name,
      artist,
      music,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
