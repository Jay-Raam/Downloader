import React, { useState, useEffect } from "react";
import "./anime.css";
import Image01 from "../image/m4.png";
import Image02 from "../image/m5.png";
import Image03 from "../image/m6.png";
import Image05 from "../image/m8.png";
import Image04 from "../image/user-imge.png";

const UnsplashImage = () => {
  const [imageData, setImageData] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true); // Set loading to true when fetching starts
      try {
        let apiUrl = `https://api.unsplash.com/photos/random/?client_id=jEemOE1gKbjCZgq7QqTrE6qjihorxfNOVdrRv2RF8rE&count=40`;

        if (query) {
          apiUrl += `&query=${encodeURIComponent(query)}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        setImageData(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchImages();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const queryValue = formData.get("query");
    setQuery(queryValue);
  };

  const handleSetImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when the image is loaded
  };

  return (
    <div className="unsplush">
      <div className="container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="input-01"
            name="query"
            placeholder="Search images..."
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>
        {isLoading && <div className="loader"></div>} {/* Loading animation */}
        {imageData.length > 0 && (
          <div className="image-container">
            {imageData.map((image) => (
              <div key={image.id} className="image-card">
                <a
                  href={image.urls.full}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      image.urls.thumb ||
                      image.urls.raw ||
                      image.urls.full ||
                      image.urls.regular ||
                      image.urls.small_s3
                    }
                    alt={image.alt_description || "Unsplash Image"}
                    className="gal-002"
                    onLoad={handleImageLoad} // Handle image load event
                  />
                </a>
                <div className="flex">
                  <img
                    src={
                      image.user.profile_image.small ||
                      image.user.profile_image.large ||
                      image.user.profile_image.medium ||
                      Image04
                    }
                    alt={image.alt_description || "Unsplash Image"}
                    onClick={() => handleSetImage(image)}
                    className="gal-003"
                  />
                  {image.user && (
                    <p
                      onClick={() => handleSetImage(image)}
                      className="gal-008"
                    >
                      Photo by {image.user.name}
                    </p>
                  )}
                </div>
                <div className="flex">
                  {image.user.social.instagram_username && (
                    <a
                      href={`https://instagram.com/${image.user.social.instagram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gal-005"
                    >
                      <img
                        src={Image01}
                        alt={image.alt_description || "Unsplash Image"}
                        className="gal-004"
                      />
                    </a>
                  )}
                  {image.user.social.twitter_username && (
                    <a
                      href={`https://twitter.com/${image.user.social.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gal-005"
                    >
                      <img
                        src={Image02}
                        alt={image.alt_description || "Unsplash Image"}
                        className="gal-004"
                      />
                    </a>
                  )}
                  {image.user.social.portfolio_url && (
                    <a
                      href={image.user.social.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gal-005"
                    >
                      <img
                        src={Image03}
                        alt={image.alt_description || "Unsplash Image"}
                        className="gal-004"
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* selected image section */}

      {selectedImage && (
        <div className="selected-image">
          <div className="selected-container">
            <span className="close-button" onClick={handleCloseImage}>
              &times;
            </span>
            {/* profile image */}
            <img
              src={
                selectedImage.user.profile_image.medium ||
                Image04 ||
                selectedImage.user.profile_image.large ||
                selectedImage.user.profile_image.small
              }
              alt={selectedImage.alt_description}
              className="gal-010"
            />
            <h3 className="gal-011">
              {selectedImage.user.first_name} {selectedImage.user.last_name}
            </h3>
            <p className="gal-012">{selectedImage.exif.make}</p>
            <div className="flex">
              <img src={Image05} alt={selectedImage.alt_description} className="gal-09"/>
              <p className="gal-012">{selectedImage.user.bio}</p>
            </div>
            <h4 className="gal-016">{selectedImage.user.location}</h4>
            <div className="flex">
              {selectedImage.user.social.instagram_username && (
                <a
                  href={`https://instagram.com/${selectedImage.user.social.instagram_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gal-012"
                >
                  <img
                    src={Image01}
                    alt={
                      selectedImage.alt_description || "Unsplash selectedImage"
                    }
                    className="gal-004"
                  />
                </a>
              )}
              {selectedImage.user.social.twitter_username && (
                <a
                  href={`https://twitter.com/${selectedImage.user.social.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Image02}
                    alt={
                      selectedImage.alt_description || "Unsplash selectedImage"
                    }
                    className="gal-004"
                  />
                </a>
              )}
              {selectedImage.user.social.portfolio_url && (
                <a
                  href={selectedImage.user.social.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Image03}
                    alt={
                      selectedImage.alt_description || "Unsplash selectedImage"
                    }
                    className="gal-004"
                  />
                </a>
              )}
            </div>
            <div className="flex-2">
              <a
                href={selectedImage.links.photos}
                target="_blank"
                rel="noopener noreferrer"
                className="gal-op"
              >
                Photo
              </a>
              <a
                href={selectedImage.links.likes}
                target="_blank"
                rel="noopener noreferrer"
                className="gal-op"
              >
                Like
              </a>
              <a
                href={selectedImage.links.followers}
                target="_blank"
                rel="noopener noreferrer"
                className="gal-op"
              >
                followers
              </a>
              <a
                href={selectedImage.links.following}
                target="_blank"
                rel="noopener noreferrer"
                className="gal-op"
              >
                following
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashImage;
