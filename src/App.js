import "./App.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"
import axios from "axios";
import { useState, useEffect } from "react";
import ImagesList from "./components/imagesList/ImagesList";
import CreateTags from "./components/createTags/CreateTags";
import TagsList from "./components/tagsList/TagsList";
function App() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  useEffect(() => {
    let imageNumber = 1;
    const images = async () => {
      const { data } = await axios.get(
        "https://picsum.photos/v2/list?page=2&limit=10"
      );
      data.map((number) => (number["imageNumber"] = imageNumber++));
      setImages(data);
    };
    images();
  }, []);
  useEffect(() => {
    const temp = localStorage.getItem("tags");
    const loadedTags = JSON.parse(temp);
    if (loadedTags) {
      setTags(loadedTags);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(tags);
    localStorage.setItem("tags", temp);
  }, [tags]);
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <ImagesList
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      
      />
      <CreateTags
        images={images}
        setImages={setImages}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
        tags={tags}
        setTags={setTags}
        setCurrentImage={setCurrentImage}
      />
      <TagsList
        tags={tags}
        setTags={setTags}
        images={images}
        setImages={setImages}
      />
    </div>
    </DndProvider>
  );
}
export default App;
