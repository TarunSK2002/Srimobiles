// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUpload = () => {
//   const [image, setImage] = useState(null);
//   const [uploadedPath, setUploadedPath] = useState('');

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       const res = await axios.post('http://localhost:5000/upload', formData);
//       setUploadedPath(res.data.path);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Image</h2>
//       <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>

//       {uploadedPath && (
//         <div>
//           <p>Uploaded Image:</p>
//           <img src={uploadedPath} alt="Uploaded" width="200" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadedPath, setUploadedPath] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setUploadedPath(res.data.path);
      fetchImages(); // Refresh image list after upload
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setImageList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Image</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Uploaded Images</h3>
      <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image Preview</th>
          </tr>
        </thead>
        <tbody>
          {imageList.map((img) => (
            <tr key={img.id}>
              <td>{img.id}</td>
              <td>
                <img src={img.path} alt={`img-${img.id}`} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageUpload;
