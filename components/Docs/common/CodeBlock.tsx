import React, { useEffect } from "react";

const CodeBlock = ({ code, language }: any) => {

  return (
    <pre>
      <code>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;