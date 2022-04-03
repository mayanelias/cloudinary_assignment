import style from "./imagesList.module.css";
import ShowImagesList from "../showImagesList/ShowImagesList";
const ImagesList = ({ images, currentImage, setCurrentImage }) => {
  let imagesListGallery = images.map((image) => {
    return (
<ShowImagesList key={image.id} setCurrentImage={setCurrentImage} currentImage={currentImage} image={image} />
    );
  });
  return (
    <div  className={style.imagesList}>
      <span className={style.imagesListTitle}>Unassigned</span>
      <br />
      <br />
      <div className={style.imagesListDiv}>{imagesListGallery}</div>
    </div>
  );
};

export default ImagesList;
