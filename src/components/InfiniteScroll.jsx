import { useEffect, useState } from "react";

export default function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  // Effect to fetch
  useEffect(() => {
    const fetchData = async function () {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=3`
      );
      const data = await response.json();
      setData((prevData) => [...prevData, ...data]);
    };
    fetchData();
  }, [pageNo]);

  // Effect to handle scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.unobserve(lastImage);
          setPageNo((pageNo) => pageNo + 1);
        }
      },
      { threshold: 0.8 }
    );

    const lastImage = document.querySelector(".image:last-child");
    if (!lastImage) {
      return;
    }
    observer.observe(lastImage);

    // Cleanup for better code
    return () => {
      if (!lastImage) {
        observer.unobserve(lastImage);
      }
      observer.disconnect();
    };
  }, [data]);

  return (
    <div className="container">
      {data.map((item) => (
        <img
          className="image"
          key={item.id}
          src={item.download_url}
          alt={`image by ${item.author}`}
        />
      ))}
    </div>
  );
}
