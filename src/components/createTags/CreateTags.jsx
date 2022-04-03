import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import randomColor from "randomcolor";
import style from "./createTags.module.css";
const CreateTags = ({
  tags,
  setTags,
  currentImage,
  currentTag,
  setCurrentTag,
  setCurrentImage,
  images,
}) => {
  const [createTag, setCreateTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [editingTextTag, setEditingTextTag] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const labelRandomColor = randomColor();
  const [tagNumber,setTagNumber] = useState(0)

  const addTag = () => {
    const temp = {
      label: createTag,
      color: labelRandomColor,
      id: uuidv4(),
      selectedImages:[],
    };
    setTags([...tags, temp]);
    setCreateTag("");
  };
  const deleteTag = (id) => {
    const tempArray = [...tags].filter((tag) => tag.id !== id);
    setTags(tempArray);
  };
  const submitEdits = (id) => {
    const updatedTags = [...tags].map((tag) => {
      if (editingTextTag === "") {
        alert("you have to enter tag name")
        setTags(updatedTags);
      }
      if (tag.id === id) {
        tag.label = editingTextTag;
      }
      return tag;
    });
    setTags(updatedTags);
    setEditingTag(null);
    setEditingTextTag("");
  };
  const addTagToTheTableList=(tagName)=> {
    currentImage.tag = tagName.label;
    const tempArray = [...images];
    const tempTaggedImages = [...tags];
    let foundTagImage = tempArray.find((image) => image.id === currentImage.id);
    tempTaggedImages[tagNumber].selectedImages.push(foundTagImage);
    setTags(tempTaggedImages);
    setCurrentImage("");
    setCurrentTag("");
  }
  const changeTitle = currentImage
    ? `photo ${currentImage?.imageNumber} - Assigned tags`
    : "Available Tags";
  const styleBorder = { border: `2px solid ${currentTag.color}` };
  return (
    <div className={style.tagsContainer}>
      <form
        className={style.tagsForm}
        onSubmit={(e) => {
          e.preventDefault();
          addTag();
        }}
      >
        <input
          className={style.createTagsInput}
          onChange={(e) => setCreateTag(e.target.value)}
          value={createTag}
          type="text"
          placeholder="Create Tag..."
        />
        <br />
        <br />
        <input
          className={style.searchTagsInput}
          type="text"
          onChange={(e) => setSearchTags(e.target.value)}
          placeholder="Search Tag..."
        />
        <br />
        <br />
        <input className={style.tagsSaveButton} type="submit" value="Save" />
      </form>
      <ul className={style.listTags}>
        <span className={style.titleTags}>{changeTitle}</span>
        {tags
          .filter((value) => {
            if (searchTags === "") return value;
            else if (
              value.label.toLowerCase().includes(searchTags.toLowerCase())
            )
              return value;
          })
          .map((tag,i) => {
            return (
              <div className={style.listTagsContainer} key={tag.id}>
                {editingTag === tag.id ? (
                  <>
                    <input
                      className={style.editTagsInput}
                      type="text"
                      onChange={(e) => setEditingTextTag(e.target.value)}
                      defaultValue={tag.label}
                    />
                    <br />
                    <br />
                      <AiOutlineCheck title="Edit"
                      onClick={() => submitEdits(tag.id)}
                      className={style.iconEditCheck}
                    />  
                  
                    <AiOutlineClose title="Cancel"
                      onClick={() => setEditingTag(editingTextTag)}
                      className={style.iconEditClose}
                    />
                  </>
                ) : (
                  <li
                    className={style.listOfTags}
                    style={
                      (currentTag?.label === tag.label && styleBorder) || {
                        background: tag.color,
                      }
                    }
                    onClick={() => {
                      setCurrentTag(tag);
                      setTagNumber(i)
                    }}
                    onDoubleClick={() => setCurrentTag("")}
                  >
                    {tag.label}
                    <FaTrashAlt title="Delete Tag"
                      onClick={() => deleteTag(tag.id)}
                      className={style.icon}
                    />
                    <BiEditAlt title="Rename Tag"
                      onClick={() => setEditingTag(tag.id)}
                      className={style.icon}
                    />
                  </li>
                )}
              </div>
            );
          })}
        {currentTag && currentImage ? (
          <button
            className={style.applyButton}
            onClick={() => {
              addTagToTheTableList(currentTag);
            }}
          >
            Apply
          </button>
        ) : null}
      </ul>
    </div>
  );
};

export default CreateTags;
