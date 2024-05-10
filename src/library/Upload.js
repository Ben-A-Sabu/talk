import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';


const uploadImage = async (file) => {

const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    toast.info('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        toast.error('Upload is paused');
        break;
      case 'running':
        toast.info('Upload is running');
        break;
      case 'success':
        toast.success('Upload is successful');
        break;  
    }
  }, 
  (error) => {

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
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
}

export default uploadImage;