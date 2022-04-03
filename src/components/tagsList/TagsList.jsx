import style from "./tagsList.module.css";
import TaggedImages from "../taggedImages/TaggedImages";
const TagsList = ({ tags, setTags }) => {
  return (
    <div  className={style.ListByTagContainer}>
      {tags.map((tag, i) => {
        return (
   <TaggedImages key={tag.id} tag={tag} i={i} tags={tags} setTags={setTags}/>
        );
      })}
    </div>
  );
};

export default TagsList;
