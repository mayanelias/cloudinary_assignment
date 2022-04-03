import React from 'react';
import { useDrag } from "react-dnd";
import style from "../imagesList/imagesList.module.css";
const ShowImagesList = ({image,setCurrentImage,currentImage}) => {
    const[{isDragging},drag]=useDrag(()=>({
        type:"image",
        item:{id:image.id,download_url:image.download_url,imageNumber:image.imageNumber},
        collect:(monitor)=>({
        isDragging:!!monitor.isDragging(),
        }),
        }));
    return (
        <div
        className={style.galleryImagesContainer}
        key={image.id}
        onClick={() => setCurrentImage(image)}
        onDoubleClick={() => setCurrentImage("")}
      >
        <img
        ref={drag}
          className={currentImage.id === image.id ? style.currentImg : null}
          src={image.download_url}
        />
        <span>photo {image.imageNumber}</span>
      </div>          
    );
};

export default ShowImagesList;