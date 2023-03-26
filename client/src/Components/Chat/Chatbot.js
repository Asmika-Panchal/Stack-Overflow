import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "./Chatbot.css";

import { arrayItems } from "./Collections";
import OptionSelection from "./OptionSelection";
import Translation from "./Translation";

function Chatbot({ handleChat }) {
  //   const configuration = new Configuration({
  //     apiKey: process.env.REACT_APP_OPENAI_KEY,
  //   });

  const configuration = new Configuration({
    // apiKey: process.env.REACT_APP_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  console.log(openai);

  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  //   console.log(process.env.REACT_APP_OPENAI_KEY);

  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = { ...option, prompt: input };

    console.log(object);

    const res = await openai.createCompletion(object);
    // const res = await openai.listEngines(object);

    console.log(res);

    setResult(res.data.choices[0].text);
  };

  return (
    <div>
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation
          doStuff={doStuff}
          setInput={setInput}
          result={result}
          input={input}
        />
      )}
      <button onClick={handleChat}>Back</button>
      <div>{input}</div>
    </div>
  );
}

export default Chatbot;
