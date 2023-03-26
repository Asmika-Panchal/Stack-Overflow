import React from "react";

function Avatar({
  children,
  backgroundColor,
  px,
  py,
  my,
  mx,
  color,
  borderRadius,
  fontSize,
  cursor,
}) {
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    margin: `${my} ${mx} ${my} 10px`,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
    width: "16px",
    height: "22px",
  };

  return <div style={style}>{children}</div>;
}

export default Avatar;
