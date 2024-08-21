import ReloadBtn from "./ReloadBtn";

const Error = ({ children }) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center mb-6">
      <div className="lg:text-lg text-md font-satoshi text-center">
        {children}
      </div>

      <ReloadBtn />
    </div>
  );
};

export default Error;
