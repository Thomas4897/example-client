export default function BlogsDisplay(props) {
  return (
    <div className="BlogPost">
      <h3>{props.titleProp}</h3>
      <div className="Author">Author: {props.authorProp}</div>
      <div className="CreatedAt">Created: {props.createdAtProp}</div>
      <p className="Text">
        {"\t"} {props.textProp}
      </p>
    </div>
  );
}
