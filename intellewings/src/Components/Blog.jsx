import { v4 as uuid4 } from "uuid";
import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// contacts show krde sare
export default function Blog() {
  const nav = useNavigate();
  const [blogs, setBlogs] = useState();
  const memoizedBlogs = useMemo(() => blogs, [blogs]);
  const deleteThis = useCallback(
    (blogId) => {
      setBlogs(blogs.filter((elem) => elem.blogId !== blogId));
      nav("/complete");
    },
    [blogs],
  );
  return (
    <>
      {memoizedBlogs.map((elem, index) => {
        return (
          <div id={index}>
            <h1>This is {elem.head}</h1>
            <h2>This is {elem.desc}</h2>
            <button onClick={() => deleteThis(elem.blogId)}>Delete</button>
            <button>Click me</button>
          </div>
        );
      })}
    </>
  );
}
