



"use client";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { IoIosShareAlt } from "react-icons/io";

export default function Page() {
  interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
  }

  const [posts, setPosts] = useState([] as Posts[]);
  const [comments, setComments] = useState([] as Comment[]);
  const [mainPage, setMainPage] = useState(1);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [popShow, setPopShow] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${mainPage}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData();
  }, [mainPage]);

  const getComments = async (postId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentClick = (postId: number) => {
    getComments(postId);
    setPopShow(true);
  };

  // const handleClick = (event: React.MouseEvent) => {
  //   setShow(!show);
  //   setTarget(event.target);
  // };

  return (
    <div style={{ margin: "70px" }}>
      <div className="d-grid gap-2 d-md-flex justify-content-md-start p-5">
        <button className="btn btn-outline-secondary me-md-2" onClick={() => setMainPage(prevPage => prevPage - 1)} disabled={mainPage === 1}>Go to Previous Page</button>
        <button className="btn btn-outline-secondary" onClick={() => setMainPage(prevPage => prevPage + 1)} disabled={mainPage === 10}>Go to Next Page</button>
      </div>

      {posts.map((post: Posts) => (
        <div key={post.id} className="mb-4">
          <div className='bg-white shadow rounded p-5 row-gap-5'>
            <div>
              <div className=" d-flex gap-1 align-items-center ">
                <img
                  src="https://fastly.picsum.photos/id/91/3504/2336.jpg?hmac=tK6z7RReLgUlCuf4flDKeg57o6CUAbgklgLsGL0UowU"
                  className='rounded-circle object-fit-cover'
                  style={{ width: "40px", height: "40px", margin:'10px', marginTop:"0" }}
                  alt="user"
                />
                <p className="text-secondary fs-7">Sobika Karthikaiselvan</p>
              </div>
              <div className="fw-semibold fs-7'">
                {post.title} 
              </div>
              <p className="fw-normal fs-6">{post.body}</p>
            </div>
            <hr/>
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
              <button type="button" className="btn btn-outline-secondary me-md-2">
                <div><AiOutlineLike /></div>
                <span>Like</span>
              </button>
              <button className="btn  btn-outline-secondary me-md-2" onClick={() => handleCommentClick(post.id)}>
                <div><LiaCommentSolid /></div>
                <span> Comment</span>
              </button>
              <button type="button" className="btn  btn-outline-secondary">
                <div><IoIosShareAlt /></div>
                <span> Share</span>
              </button>
            </div>
            <hr/>
          </div>

          <Overlay
            show={popShow}
            target={target}
            placement="bottom"
            transition={false}
            onHide={() => setPopShow(false)}
          >
            <Popover id="popover-contained">
              <Popover.Header as="h3">Comments</Popover.Header>
              <Popover.Body>
                {comments.map((com: Comment) => (
                  <div key={com.id} className="gap-8">
                    <div className="text-secondary fs-9">
                      <p>{com.name}</p>
                      <p>{com.body}</p>
                    </div>
                  </div>
                ))}
              </Popover.Body>
              <Button onClick={() => setPopShow(false)}>Close</Button>
            </Popover>
          </Overlay>
        </div>
      ))}
    </div>
  );
}
