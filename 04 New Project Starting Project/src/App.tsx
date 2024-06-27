import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { ReactNode, useEffect, useState } from "react";
import { get } from "./ultil/http";
import image from "./assets/canva design.png";

type rawDataPost = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

function App() {
  const [fetchData, setFetchData] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPost() {
      const data = (await get(
        "https://jsonplaceholder.typicode.com/posts"
      )) as rawDataPost[];

      const blogPosts: BlogPost[] = data.map((rawPost) => ({
        id: rawPost.id,
        title: rawPost.title,
        text: rawPost.body
      }));
      
      setFetchData(blogPosts);
    }
    fetchPost();
  }, []);

  let content: ReactNode;

  if (fetchData) {
    content = <BlogPosts posts={fetchData} />;
  } else {
    content = <p>Loading...</p>;
  }

  return (
    <main>
      <img src={image} alt="image" />
      {content}
    </main>
  );
}

export default App;
