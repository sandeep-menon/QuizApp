import { useState } from "react";
import Button from "./button";
interface QuestionProps {
    question: string;
    options: string[];
    correctOption: string;
    nextQuestion: () => void;
}
function Question({ question, options, correctOption, nextQuestion }: QuestionProps) {
    const [message, setMessage] = useState("");
    const [next, setNext] = useState(false);
    const checkAnswer = (event: React.MouseEvent<HTMLDivElement>) => {
        setMessage("");
        if ((event.target as HTMLElement).innerText === correctOption) {
            (event.target as HTMLElement).classList.add("bg-green-700", "font-semibold");
            const parent = (event.target as HTMLElement).parentElement;
            if (parent) {
                parent.classList.add("pointer-events-none");
            }
            setMessage("Hurray! You got the answer right! 🎉");
        } else {
            (event.target as HTMLElement).classList.add("bg-red-700",  "font-semibold");
            const parent = (event.target as HTMLElement).parentElement;
            if (parent) {
                parent.classList.add("pointer-events-none");
                Array.from(parent.children).forEach((child) => {
                    if ((child as HTMLElement).innerText === correctOption) {
                        child.classList.add("bg-green-700", "font-semibold");
                    }
                })
            }
            setMessage("Oops! The correct answer is " + correctOption);
        }
        setNext(true);
    }
    return (
        <div className="flex flex-col gap-4">
            <div dangerouslySetInnerHTML={{__html: question}} className="text-3xl font-semibold"></div>
            <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                    <div key={option} role="button" onClick={(event) => checkAnswer(event)} className="px-4 py-2 border rounded-md hover:bg-amber-600 hover:cursor-pointer">{option}</div>
                ))}
            </div>
            <div className="text-center font-semibold text-xl">{message}</div>
            {next && <>
                <Button onClick={nextQuestion}>Next Question</Button>
            </>}
        </div>
    )
}

export default Question;