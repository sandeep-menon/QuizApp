import { useState } from "react";
import Button from "./components/button";
import Question from "./components/Question";
import Loader from "./components/loader";

function App() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState("");
  const startGame = async () => {
    setLoading(true);
    const res = await fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple");
    const json = await res.json();
    if (json.response_code == 0) {
      const q = json.results[0].question;
      const c = json.results[0].correct_answer;
      const o = json.results[0].incorrect_answers;
      const i = Math.floor(Math.random() * (o.length + 1));
      o.splice(i, 0, c);

      setQuestion(q);
      setOptions(o);
      setCorrectOption(c);

      setLoading(false);
    }
  }

  return (
    <div className="root p-4">
      <div className="flex flex-col gap-4 items-center justify-center backdrop-blur bg-white/30 border border-white/40 rounded-md shadow-md p-4">
        <div className="text-5xl font-extrabold flex-1/3">QuizApp</div>
        <div className="flex-2/3 p-4">
          { loading ? (<Loader />) : (question != "" ? (<div>
            <Question question={question} options={options} correctOption={correctOption} nextQuestion={startGame} />
          </div>) : (<Button onClick={startGame}>Start</Button>)) }
        </div>
      </div>
    </div>

  );
}

export default App
