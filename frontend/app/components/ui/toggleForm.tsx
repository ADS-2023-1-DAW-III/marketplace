import React from "react";

interface FormToggleProps {
  isLogin: boolean;
  toggleForm: (value: boolean) => void;
}

const FormToggle: React.FC<FormToggleProps> = ({ isLogin, toggleForm }) => {
  return (
    <div
      style={{ backgroundColor: "#004C4C" }}
      className="w-1/2 flex flex-col items-center justify-center relative"
    >
  
      <div className="absolute top-[-80px] left-13 transform -translate-x-1/2 bg-[#e9f1f5] p-1 rounded-lg shadow-inner flex w-[167px] justify-between">
        <button
          onClick={() => toggleForm(true)}
          className={`px-1 py-1 text-sm font-semibold rounded-md transition ${
            isLogin
              ? "bg-white shadow text-[#004C4C]"
              : "text-[#004C4C] opacity-80 hover:opacity-100"
          }`}
        >
          LOGIN
        </button>
        <button
          onClick={() => toggleForm(false)}
          className={`px-2 py-2 text-sm font-semibold rounded-md transition ${
            !isLogin
              ? "bg-white shadow text-[#004C4C]"
              : "text-[#004C4C] opacity-80 hover:opacity-100"
          }`}
        >
          CADASTRAR
        </button>
      </div>
    </div>
  );
};

export default FormToggle;
