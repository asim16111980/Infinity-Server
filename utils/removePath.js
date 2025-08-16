import fs from "fs/promises";
import AppError from "./appError.js";
import path from "path";

async function removePath(dirPath,fileName=null) {
  try {

    if (fileName===null) {
      await fs.rm(dirPath, { recursive: true, force: true });
    } else {
      await fs.rm(path.join(dirPath,fileName), { force: true });
    }
  } catch (err) {
    throw new AppError(`Error removing path: ${err.message}`, 500);
  }
}
export default removePath;
