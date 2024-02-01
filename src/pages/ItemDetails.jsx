import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = res.data;

        setNft({
          id: data.id,
          title: data.title,
          tag: data.tag,
          description: data.description,
          nftImage: data.nftImage,
          nftId: data.nftId,
          ownerName: data.ownerName,
          ownerId: data.ownerId,
          ownerImage: data.ownerImage,
          creatorName: data.creatorName,
          creatorId: data.creatorId,
          creatorImage: data.creatorImage,
          price: data.price,
          likes: data.likes,
          views: data.views,
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {isLoading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="400px" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="200px" height="36px" borderRadius="8px" />
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                      </div>
                    </div>
                    <Skeleton width="400px" height="80px" borderRadius="8px" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.ownerId}`}>
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.ownerId}`}>
                              <Skeleton
                                width="200px"
                                height="32px"
                                borderRadius="8px"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.creatorId}`}>
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.creatorId}`}>
                              <Skeleton
                                width="200px"
                                height="32px"
                                borderRadius="8px"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">

                        <Skeleton width="150px" height="36px" borderRadius="8px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{nft.title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nft.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft.likes}
                      </div>
                    </div>
                    <p>{nft.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.ownerId}`}>
                              <img
                                className="lazy"
                                src={nft.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.ownerId}`}>
                              {nft.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.creatorId}`}>
                              <img
                                className="lazy"
                                src={nft.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.creatorId}`}>
                              {nft.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span> {nft.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
