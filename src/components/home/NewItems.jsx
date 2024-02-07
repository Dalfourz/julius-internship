import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Countdown timer component
export const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = expiryDate - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup on component unmount
  }, [expiryDate]);

  const formatTime = (time) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    return `${pad(time.hours)}h ${pad(time.minutes)}m ${pad(time.seconds)}s`;
  };

  if (!expiryDate || expiryDate <= 0) {
    return null;
  }

  return (
    <>
      <div>{formatTime(timeLeft)}</div>
    </>
  );
};

function NewItems() {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        const data = res.data;

        setNewItems(
          data.map((e) => ({
            id: e.id,
            title: e.title,
            authorImage: e.authorImage,
            nftImage: e.nftImage,
            nftId: e.nftId,
            authorId: e.authorId,
            code: e.code,
            price: e.price,
            likes: e.likes,
            expiryDate: e.expiryDate,
          }))
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid lightgray",
          borderRadius: "50%",
          width: "52px",
          height: "52px",
          color: "black",
          background: "white",
          zIndex: "100",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <i
          className="fa fa-chevron-left"
          style={{ fontSize: "10px", transform: "translate(-10px, 1px)" }}
        ></i>
      </button>
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid lightgray",
          borderRadius: "50%",
          width: "52px",
          height: "52px",
          color: "black",
          background: "white",
          zIndex: "100",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <i
          className="fa fa-chevron-right"
          style={{ fontSize: "10px", transform: "translate(-10px, 1px)" }}
        ></i>
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    arrows: "true",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  if (isLoading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp"></div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="350px" borderRadius="8px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div>
              <Slider {...settings}>
                {newItems.map((newItem, index) => (
                  <div
                    className="px-3"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${newItem.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={newItem.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {newItem.expiryDate && (
                        <div className="de_countdown">
                          <CountdownTimer expiryDate={newItem.expiryDate} />
                        </div>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${newItem.nftId}`}>
                          <img
                            src={newItem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${newItem.nftId}`}>
                          <h4>{newItem.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {newItem.price} ETH
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              </div>
              

            </div>
          </div>

      </section>
    );
  }
}

export default NewItems;
