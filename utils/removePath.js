import fs from "fs/promises";

async function removePath(path) {
  try {
    const stats = await fs.lstat(path);

    if (stats.isDirectory()) {
      await fs.rm(path, { recursive: true, force: true });
      console.log(`Folder removed: ${path}`);
    } else {
      await fs.rm(path, { force: true });
      console.log(`File removed: ${path}`);
    }
  } catch (err) {
    console.error("Error removing:", err.message);
  }
}
export default removePath;
