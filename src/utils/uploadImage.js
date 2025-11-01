import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase"; // ruta según tu estructura

export const uploadImageToFirebase = async (file, userName) => {
  if (!file) return null;

  const imageRef = ref(storage, `avatars/${userName}-${Date.now()}`);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
};
