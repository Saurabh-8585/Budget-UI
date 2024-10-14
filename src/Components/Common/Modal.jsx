import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ open, onClose, title, children, footer = null }) => {

    return (

        open && <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-4 border-b rounded-t ">
                    <h3 className="text-lg font-semibold text-gray-900 ">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <AiOutlineClose size={20} />
                    </button>
                </div>
                <div className="p-4 space-y-4">{children}</div>
                {footer && <div className="flex items-center p-4 border-t border-gray-200 rounded-b ">
                    <button
                        onClick={onClose}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Close
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default Modal;
