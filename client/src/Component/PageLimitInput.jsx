export default function PageLimitInput(props) {
  return (
    <div className="Page-Limit">
      <div>Limit: {props.limitProp}</div>
      <div>
        Page: ({props.pageProp} of{" "}
        {Math.ceil(props.blogsLengthProp / props.limitProp)})
      </div>

      <div>
        <lable>Select Limit: </lable>
        <input
          className="Limit-Input"
          type="number"
          value={props.limitProp}
          onChange={(e) => {
            props.setLimit(e.target.value);
          }}
        />
      </div>

      <div>
        <lable>Select Page: </lable>
        <input
          className="Page-Input"
          type="number"
          value={props.pageProp}
          onChange={(e) => {
            props.setPage(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
