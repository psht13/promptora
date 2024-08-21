import { IoReload } from "react-icons/io5";

const ReloadBtn = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <button
      type="button"
      className="flex justify-center items-center hover:bg-black
       hover:text-white w-10 h-10 rounded-full transition lg:w-14 lg:h-14"
      onClick={handleClick}>
      <IoReload className="w-5 h-5 lg:w-7 lg:h-7" />
    </button>
  );
};

export default ReloadBtn;
