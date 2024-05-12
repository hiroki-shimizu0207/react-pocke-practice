import React from "react";
import "./card.css";

const Card = ({ pockemon }) => {
  const pockemonImg = pockemon.sprites.front_default;
  return (
    <>
      <div key={pockemon.id} className="card">
        <div className="cardImg">
          <img key={pockemonImg} src={pockemonImg} alt={pockemon.name} />
        </div>
        <h3 key={pockemon.name} className="cardName">
          {pockemon.name}
        </h3>
        <div className="cardTypes">
          <div className="cardTypesFlex">
            タイプ:
            {pockemon.types.map((el, i) => {
              // console.log(pockemon.types.length - 1);
              // console.log(i);
              // console.log(i !== pockemon.types.length - 1);
              return (
                <div key={el.type.name}>
                  <span className="typeName">
                    {el.type.name}
                    {i !== pockemon.types.length - 1 ? "," : ""}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="cardInfo">
            <div className="cardDAta">
              <p className="title">重さ:{pockemon.weight}</p>
            </div>
          </div>
          <div className="cardInfo">
            <div className="cardDAta">
              <p className="title">高さ:{pockemon.height}</p>
            </div>
          </div>
          <div className="cardInfo">
            <div className="cardDAta">
              <p className="title">アビリティ:{pockemon.abilities[0].ability.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
