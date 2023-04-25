import { useNavigate } from "react-router-dom";
import { DirectorItemContainer, BackgroundImage, Body } from "./directory-item.styles";


const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <DirectorItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl= {imageUrl}/>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectorItemContainer>
  );
};

export default DirectoryItem;
