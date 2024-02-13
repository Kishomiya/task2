

"use client";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover'

interface Albums {
  userId: number,
  id: number,
  title: string
}
interface Photos {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

function AlbumsPage() {
  const [albums, setAlbums] = useState([] as Albums[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([] as Photos[]);
  const [albumId, setAlbumId] = useState(0);
  const [popShow, setPopShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${currentPage}`);
        const data = await response.json();
        setAlbums(data); 
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const popup = async (albumId: number) => {
    setAlbumId(albumId);
    fetchPhotos(albumId);
    setPopShow(true);
  };
  
  const fetchPhotos = async (albumId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <div>
      <div>Albums</div>
      <div>
        <div>
          <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>Previous</button>
          <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === 10}>Next</button>
        </div>
        <div>
          {albums.map((album) => (
            <div key={album.id} onClick={() => { popup(album.id) }}>
              <div>
                <h5>{album.title}</h5>
              </div>
            </div>
          ))}
        </div>
        <Overlay
          show={popShow}
          target={document.getElementById("popover-target")}
          placement="bottom"
          transition={false}
          onHide={() => setPopShow(false)}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">Photos</Popover.Header>
            <Popover.Body>
              {photos.map((photo) => (
                <div key={photo.id} className="gap-8">
                  <div className="text-secondary fs-9">
                    <img src={photo.url} alt={photo.title}/>
                  </div>
                </div>
              ))}
            </Popover.Body>
            <Button onClick={() => setPopShow(false)}>Close</Button>
          </Popover>
        </Overlay>
      </div>
    </div>
  )
}

export default AlbumsPage;
