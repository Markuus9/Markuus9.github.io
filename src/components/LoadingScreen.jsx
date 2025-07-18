export const LoadingScreen = () => {
    const [text, setText] = useState("");
    const fullText = "<Hello World />";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index))
            index += 1;
            if (index > fullText.length) {
                clearInterval(interval);
            }
        }, 100); 
        return () => clearInterval(interval);
    });

  return (
    <div className="fixed inset-0 z-50 bg-white text-gray-100 flex flex-col items-center justify-center">
        <div className="mb-4 text-4xl font-mono font-bold">
            Hello World <span className="animate-blink ml-1">|</span>
        </div>

        <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
            <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bat"></div>
            {" "}
        </div>
    </div>
  );
}