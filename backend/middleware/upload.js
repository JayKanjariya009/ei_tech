import multer from "multer";
import path from "path";
import fs from "fs";

const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Function that returns multer instance for a specific folder
export const createUploader = (folderName) => {
  const uploadPath = `uploads/${folderName}`;
  ensureFolderExists(uploadPath);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image formats allowed"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });
};

// Service uploader with separate folders for icons and images
export const createServiceUploader = () => {
  ensureFolderExists("uploads/serviceIcons");
  ensureFolderExists("uploads/serviceImages");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = file.fieldname === "icon" ? "uploads/serviceIcons" : "uploads/serviceImages";
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image formats allowed"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).fields([
    { name: "icon", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]);
};
