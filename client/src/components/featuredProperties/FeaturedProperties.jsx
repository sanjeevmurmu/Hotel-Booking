import Skeleton from "react-loading-skeleton";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data,loading,error}=useFetch("https://lodgeluxeapi.onrender.com/api/hotels?featured=true&limit=4")
  console.log(error)
  return (
    <div className="fp">
      {loading? <h2 className="featprop-skeleton">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton  />
        </h2>:(<>
      {data.map((item)=>(<div className="fpItem" key={item._id}>
        <img
          src={item.photos[0]}
          alt=""
          className="fpImg"
          />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
        </div>
  
      ))}
      </>
      )}
     
    </div>
  );
};

export default FeaturedProperties;