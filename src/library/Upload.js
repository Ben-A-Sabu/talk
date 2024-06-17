import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

const uploadImage = async (file) => {
  const storage = getStorage();

  // Create the file metadata
  const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const date= new Date();
  const storageRef = ref(storage, `images/${date + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',(snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, 
      (error) => {
        reject(error+'check the uploaded image');
        switch (error.code) {
          case 'storage/unauthorized':
            toast.error('User doesn\'t have permission to access the object');
            break;
          case 'storage/canceled':
            toast.error('User canceled the upload');
            break;
          case 'storage/unknown':
            toast.error('An unknown error occurred');
            break;
           default:
            toast.error('An unknown error occurred'); 
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadImage;
