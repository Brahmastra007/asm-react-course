'use client';

import { useRef } from 'react';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  // Use a ref to attach to the image input
  const imageInput = useRef();

  function handlePickClick() {
    // On clicking this button, the image input element should be clicked and the dialog box
    // to select an image should be shown.
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      {/* Add label for the image input */}
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        {/* We don't want to show the default input button so we have hidden it. */}
        <input
          className={classes.input}
          // We want the user to upload a file
          type="file"
          id={name}
          // Only accept 'png' and 'jpeg' images
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />
        {/* Instead we want to show this button with our custom styles */}
        <button
          className={classes.button}
          type="button"
          // Add on-click handler function
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
