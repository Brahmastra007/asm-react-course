'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  // Set a state to store the picked image
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    // Get the uploaded file
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    /* Define a file reader which is needed to convert the image into a data URL which can
    be used as an input to the image element. */
    const fileReader = new FileReader();

    // When the file reader is done, it will trigger the 'onLoad' function
    fileReader.onload = () => {
      // Assign the generated URL to the 'pickedImage' state so that the preview is shown
      setPickedImage(fileReader.result);
    };

    // Read the image file
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        {/* Element to show a preview of the picker image */}
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {/* If an image is picked, show its preview using the 'pickedImage' state */}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          // Add on-change event handler which is triggered whenever a new image is uploaded
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
