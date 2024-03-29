import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import ".../globals.css";
import Link from "next/link";
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';
import { FiMoreHorizontal } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <div>
          <h1 className="text-primary fw-bold fs-0 p-2 d-block bg-white " style={{marginTop:"0"}}>Facebook</h1>
        </div>
        <div className="bg-white shadow rounded p-5" style={{margin:"70px", marginTop:"0"}}>
          
          <div>
              <div className="d-flex align-items-center justify-content-between gap-2 ">
                {/* <p className="container d-flex  flex-lg-row justify-content-evenly fs-3">not mine your are mine</p> */}
                <img
                  alt='cover' className="img-fluid rounded mx-auto position-relative object-fit-cover pt-30" style={{ width: '75vw', maxHeight: '60vh'}} src="https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI" 
                />
            </div>
            <div className=" align-items-center" style={{position:"relative", left:"300px", top:"-75px", zIndex:"1"}}>
              <img className="rounded-circle object-fit-cover border border-5 border-light  "
                  width={"250px"}
                  height={"250px"}
                  src="https://fastly.picsum.photos/id/91/3504/2336.jpg?hmac=tK6z7RReLgUlCuf4flDKeg57o6CUAbgklgLsGL0UowU" 
                  alt='profileImage'/>
            </div>
            <div className="profileImage text-center" style={{margin:"50px", marginTop:"0"}}>
              <h1 className="fs-1 fw-bolder ">Sobika Karthikaiselavan</h1>
              <p className="fw-semibold fs-7 ">0 Followers . 0 Follwing</p>
              <hr/>
            </div>
            <div>
              <ul className="nav column-gap-3 text-secondary fs-7"  style={{margin:"50px", marginTop:"0", marginBottom:"0"}}>
                <li ><Link className="text-decoration-none text-black" href={'/main/posts'}>Posts</Link></li>
                <li ><Link className="text-decoration-none text-black" href={'/main/album'}>Album</Link></li>
                <li ><Link className="text-decoration-none text-black" href={'/main/photo'}>Photos</Link></li>
                <span className="d-flex align-items-end"><FiMoreHorizontal /></span>
                
              </ul>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}


