import React from "react";
import { useDropzone } from "react-dropzone";

function Basic(props) {
  const onDrop = (acceptedFiles) => {
    // Create object URLs for the files
    const imageFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Update the state with the new images
    props.setTemp((prevImages) => [...prevImages, ...imageFiles]);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select files</p>
      </div>
      <aside>
        <h4>Selected Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default Basic;
