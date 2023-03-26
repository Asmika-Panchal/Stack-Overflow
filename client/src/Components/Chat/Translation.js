import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Translation({ doStuff, setInput, result }) {
  return (
    <>
      <div>
        <input
          className="text-area"
          placeholder="Ask your Query...."
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <button type="submit" className="action-btn" onClick={doStuff}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>

        <p className="result-text">{result.length > 0 ? result : ""}</p>
      </div>
    </>
  );
}

export default Translation;
