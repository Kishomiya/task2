"use client"
import React, { useEffect, useState } from 'react'; 


interface Posts {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function Page() {
  const [photos, setPhotos] = useState([] as Posts[]);
  const [mainPage, setMainPage] = useState(1);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (mainPage: number) => {
      try {
        // setLoading(true); 
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${mainPage}`);
        const data = await response.json();
        setPhotos(data);
        // setLoading(false); 
      } catch (error) {
        console.error('Error fetching photos:', error);
        // setLoading(false); 
      }
    };
    fetchData(mainPage);
  }, [mainPage]);

  const handleClick = (event: any) => {
    const selectedPage = event.selected + 1;
    setMainPage(selectedPage);
  };

  return (
    <div>
      <div>Photos</div>
      <div>
          <button onClick={() => setMainPage(prevPage => prevPage - 1)} disabled={mainPage === 1}>Previous</button>
          <button onClick={() => setMainPage(prevPage => prevPage + 1)} disabled={mainPage === 10}>Next</button>
        </div>
      <div className='d-grid gap-2 d-md-flex justify-content-md-start p-5' style={{ width: '20px', maxHeight: '20px' }}>
          <div>
            {photos.map((photo, index) => (
              <div className='mb-2' key={photo.id}>
                <div key={photo.id} >
                  <img src={photo.url}/>
                  <span>Photo ID:{photo.id}</span>
                </div>
              </div>
            ))}
          </div>
        
    
      </div>
    </div>
  )
}

export default Page;
