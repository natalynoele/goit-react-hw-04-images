const ImageGalleryItem = ({ url, alt } ) => {
  return (
    <li className="ImageGalleryItem">
      <img src={url} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
};
export default ImageGalleryItem