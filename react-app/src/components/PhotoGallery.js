import React, { useState, useEffect, useCallback } from 'react';
import './PhotoGallery.css';
import Modal from './Modal';

// Generate sample photos
const generatePhotos = (year, count = 30) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `photo-${index}`,
    year,
    type: 'photo',
    src: `https://picsum.photos/300/200?random=${index + year}`,
    alt: `Photo from ${year} - ${index + 1}`,
  }));
};

// Generate sample videos
const generateVideos = (year, count = 10) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `video-${index}`,
    year,
    type: 'video',
    src: `https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_${index}.mp4`,
    alt: `Video from ${year} - ${index + 1}`,
  }));
};

// Sample data
const mediaData = [
  ...generatePhotos(2023, 50),
  ...generateVideos(2023, 20),
  ...generatePhotos(2022, 30),
  ...generateVideos(2022, 15),
];

const PhotoGallery = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [mediaType, setMediaType] = useState('All');
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const years = ['All', ...new Set(mediaData.map((media) => media.year))];
  const openModal = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const filterMedia = useCallback(() => {
    let filteredMedia = mediaData;

    if (selectedYear !== 'All') {
      filteredMedia = filteredMedia.filter((media) => media.year === parseInt(selectedYear));
    }

    if (mediaType === 'Photos') {
      filteredMedia = filteredMedia.filter((media) => media.type === 'photo');
    } else if (mediaType === 'Videos') {
      filteredMedia = filteredMedia.filter((media) => media.type === 'video');
    }

    return filteredMedia;
  }, [selectedYear, mediaType]);

  useEffect(() => {
    setDisplayedMedia(filterMedia());
  }, [filterMedia]);

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMediaTypeChange = (e) => setMediaType(e.target.value);

  const photos = displayedMedia.filter((media) => media.type === 'photo');
  const videos = displayedMedia.filter((media) => media.type === 'video');

  return (
    <div className="gallery-container">
      {/* Sticky Filter Section */}
      <div className="sticky-selectors">
        <div className="selectors">
          <label>
            Select Year:
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select Media:
            <select value={mediaType} onChange={handleMediaTypeChange}>
              <option value="All">All</option>
              <option value="Photos">Photos</option>
              <option value="Videos">Videos</option>
            </select>
          </label>
        </div>
      </div>

      {/* Photos Row */}
      {photos.length > 0 && (
        <div className="media-row">
          <h2>Photos</h2>
          <div className="horizontal-scroll">
            {photos.map((photo) => (
              <div key={photo.id} className="media-item" onClick={() => openModal(photo)}>
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Row */}
      {videos.length > 0 && (
        <div className="media-row">
          <h2>Videos</h2>
          <div className="horizontal-scroll">
            {videos.map((video) => (
              <div key={video.id} className="media-item">
                <video controls>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} media={selectedMedia} />
    </div>
  );
};

export default PhotoGallery;
