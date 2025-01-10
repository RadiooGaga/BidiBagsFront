import React,{ useState }  from "react";
import StyledCategoryCards from "../../StyledComponents/StyledCategoryCards";
const { Cube, Side, CategoryTitle} = StyledCategoryCards;


export const Box = React.memo(({  img, categoryName, onClick }) => {

   const [rotateY, setRotateY] = useState(0);
   const handleMouseEnter = () => setRotateY(180);
   const handleMouseLeave = () => setRotateY(0);


   return (
    <Cube
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateY(${rotateY}deg)`, 
        transition: 'transform 1.5s ease',
      }}
    >
     <Side $variant="front" onClick={onClick}>
        <CategoryTitle>{categoryName}</CategoryTitle>
      </Side>
      <Side $variant="principal" $backgroundImage={img} />
      <Side $variant="back" onClick={onClick}>
        <CategoryTitle>{categoryName}</CategoryTitle>
      </Side>
    </Cube>
  );
});