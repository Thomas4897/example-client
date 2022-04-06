export default function BlogTextUpdater(props) {
  return (
    <div className="blog-text-updater">
      <select onChange={props.handleSelectBlog} placeholder="Choose Author">
        <option value={null}></option>
        {props.blogsProp.map((blog) => {
          return (
            <option key={blog.id} value={blog.id}>
              {blog.author}
            </option>
          );
        })}
      </select>
      <textarea
        className="text-to-update-input"
        value={props.selectedBlogText}
        onChange={props.handleBlogTextUpdate}
        type="text"
      />
    </div>
  );
}
