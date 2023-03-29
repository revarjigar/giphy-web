// import "./styles.css";
import React, {
  useState,
  useEffect,
  useRef,
} from "react";

export default function ImgSlider() {
  const [images, setImages] = useState<any[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [optionValue, setOptionValue] = useState('center-top');
  const query = useRef<HTMLInputElement>(null);
  async function getAPI() {
    const search = query.current?.value || 'cat';
    const api_key = '1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq';
    const response = await fetch(`https://api.giphy.com/v1/stickers/search?q=${search}&limit=10&rating=g&api_key=${api_key}`);
    const jsonData = await response.json();
    setImages(jsonData.data);
  }

  const nextImg = () => {
    current === 9 ? setCurrent(0) : setCurrent(current + 1);
  };
  const prevImg = () => {
    current === 0 ? setCurrent(9) : setCurrent(current - 1);
  };

  useEffect(() => {
    getAPI();
  }, []);
  return (
    <div>
      <div>
        <label>Search: {optionValue}</label>
        <input type="text" ref={query} onKeyDown={getAPI}/>
      </div>
      <label htmlFor="display">Choose a display:</label>
      <select name="display" id="display" value={optionValue} onChange={(e) => setOptionValue(e.target.value)}>
        <option value="center-top">on top of image - center top</option>
        <option value="center-bottom">on top of image - center bottom</option>
        <option value="center">below image - center</option>
      </select>
      <div className="imgSlider container">
        <div
          className="img-wrapper-desktop"
          style={{ transform: `translateX(${current * -200}px)` }}
        >
          {images.map((image, index) => (
            <img
              className={`img`}
              src={image.images.downsized_medium.url}
            />
          ))}
        </div>
        <div
          className="img-wrapper-mobile"
          style={{ transform: `translateY(${current * -200}px)` }}
        >
          {images.map((image, index) => (
            <img
              className={`img`}
              src={image.images.downsized_medium.url}
            />
          ))}
        </div>
        <span className={optionValue}>{query.current?.value}</span>
        <div>
          <button className="slider__btn-prev" onClick={prevImg}>{`<`}</button>
          <button className="slider__btn-next" onClick={nextImg}>{`>`}</button>
        </div>
      </div>
    </div>
  );
};
