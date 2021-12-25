import React from "react";
const HeadingBanner = ({ text }) => {
  return (
      <h1 className="is-size-2 is-size-4-mobile has-background-white-ter has-text-left p-4 m-1 is-capitalized">
        {text}
      </h1>
  )
}

export default HeadingBanner;
