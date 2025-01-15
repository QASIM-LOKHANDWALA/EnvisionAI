import { imaginativePrompts } from "../constants";
import FileSaver from "file-saver";

export function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * imaginativePrompts.length);
  const randomPrompt = imaginativePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpeg`);
}
