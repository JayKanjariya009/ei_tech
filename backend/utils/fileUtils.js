import fs from "fs";
import path from "path";

export const deleteFiles = (files, folder) => {
  if (!files || !Array.isArray(files)) return;
  
  files.forEach((filename) => {
    if (filename) {
      const filePath = path.join("uploads", folder, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  });
};

export const deleteFile = (filename, folder) => {
  if (!filename) return;
  
  const filePath = path.join("uploads", folder, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};