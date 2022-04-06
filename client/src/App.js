import { useState, useEffect } from "react";
import BlogsDisplay from "./Component/BlogsDisplay";
import BlogTextUpdater from "./Component/BlogTextUpdater";

import "./App.css";

function App() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [blogsLength, setBlogsLength] = useState(0);
  const [filteredAuthor, setFilteredAuthor] = useState("All");
  const [blogIdToUpdate, setBlogIdToUpdate] = useState(null);
  const [blogTextToUpdate, setBlogTextToUpdate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://6239ddb128bcd99f02763cfe.mockapi.io/blogs?limit=${limit}&page=${page}`
      );
      const data2 = await fetch(
        `https://6239ddb128bcd99f02763cfe.mockapi.io/blogs`
      );
      const json = await data.json();
      const json2 = await data2.json();
      setBlogs(json);
      setBlogsLength(json2.length);
      return json;
    };

    fetchData();
  }, [limit, page]);

  const handleSelectBlog = (event) => {
    const blogId = event.target.value;

    const filteredBlogs = blogs.filter((blog) => {
      return String(blog.id) === blogId;
    });
    const selectedBlog = filteredBlogs[0];
    const blogText = selectedBlog.text;

    setBlogIdToUpdate(blogId);
    setBlogTextToUpdate(blogText);
  };

  const handleBlogTextUpdate = (event) => {
    const newText = event.target.value;

    const mappedBlogs = blogs.map((blog) => {
      const updatedBlog = blog;

      if (String(blog.id) === blogIdToUpdate) {
        updatedBlog.text = newText;
      }
      return blog;
    });

    setBlogs(mappedBlogs);
    setBlogTextToUpdate(newText);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="author-filter">
          <select
            className="AuthorSelect"
            onChange={(e) => {
              setFilteredAuthor(e.target.value);
            }}
          >
            <option>All</option>
            {blogs.map((blog) => {
              return <option value={blog.author}>{blog.author}</option>;
            })}
          </select>
          <BlogTextUpdater
            blogsProp={blogs}
            selectedBlogId={blogIdToUpdate}
            selectedBlogText={blogTextToUpdate}
            handleSelectBlog={handleSelectBlog}
            handleBlogTextUpdate={handleBlogTextUpdate}
          />
        </div>
        {console.log(page)}

        <div className="Page-Limit">
          <div>Limit: {limit}</div>
          <div>
            Page: ({page} of {Math.ceil(blogsLength / limit)})
          </div>

          <div>
            <lable>Select Limit: </lable>
            <input
              className="Limit-Input"
              type="number"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            />
          </div>

          <div>
            <lable>Select Page: </lable>
            <input
              className="Page-Input"
              type="number"
              value={page}
              onChange={(e) => {
                setPage(e.target.value);
              }}
            />
          </div>
        </div>

        {blogs.length <= 0 && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className="BlogList">
          {blogs.map((blog) => {
            if (blog.author === filteredAuthor || filteredAuthor === "All") {
              let formattedText = blog.text.replace(/\n/g, "\n\t");
              return (
                <BlogsDisplay
                  key={`Blog-${blog.id}`}
                  authorProp={blog.author}
                  createdAtProp={blog.createdAt}
                  textProp={formattedText}
                  titleProp={blog.title}
                />
              );
            }
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
