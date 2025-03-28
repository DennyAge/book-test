const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
      <div className="lex-col gap-4 w-full h-dvh flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
