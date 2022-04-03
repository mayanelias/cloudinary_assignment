import { useDrop } from "react-dnd";
import { FaTrashAlt } from "react-icons/fa";
import style from "../tagsList/tagsList.module.css";
const TaggedImages = ({tags,setTags,i,tag}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => dragImageToTheTable(item),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));
      const dragImageToTheTable = (obj) => {
        const temp = [...tags];
        temp[i].selectedImages.push(obj);
        setTags(temp);
      };
      const deleteTaggedImage = (i, j) => {
        const temp = [...tags];
        temp[i].selectedImages.splice(j, 1);
        setTags(temp);
      };
    return (
        <div ref={drop} className={style.tagsListTable}>
         <table key={tag.id}>
            <thead>
              <tr>
                <th style={{ background: tag.color }}>{tag.label}</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                {tag.selectedImages?.map((image, j) => {
                  return (
                    <td  key={image.id}>
                      <img src={image.download_url} />
                      <span className={style.titleTableName}>
                        photo {image.imageNumber}
                      </span>
                      <FaTrashAlt
                        className={style.deleteIcon}
                        onClick={() => deleteTaggedImage(i, j)}
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>          
        </div>
    );
};

export default TaggedImages;