import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        const data = res.data;

        setCollections(
          data.map((e) => ({
            id: e.id,
            title: e.title,
            authorImage: e.authorImage,
            nftImage: e.nftImage,
            nftId: e.nftId,
            authorId: e.authorId,
            code: e.code,
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
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="190px" borderRadius="5px" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width="40px" height="40px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <Skeleton
                        width="160px"
                        height="25px"
                        borderRadius="5px"
                      />
                    </Link>
                  </div>
                  <Skeleton width="120px" height="25px" borderRadius="5px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div>
              <Slider {...settings}>
                {collections.map((collection, index) => (
                  <div className="px-3" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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
};

export default HotCollections;
