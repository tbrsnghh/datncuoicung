import React from "react";

function DeleteBtn({ onclick }) {
  return (
    <button
      className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-xs hover:bg-red-500 hover:text-white transition-all"
      onClick={onclick}
    >
      ❌ Xóa
    </button>
  );
}
function EditBtn({ onclick }) {
  return (
    <button
      className="px-3 py-1 text-blue-500 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-all"
      onClick={onclick}
    >
      ✏️ Sửa
    </button>
  );
}
function DetailBtn({ onclick }) {
  return (
    <button
      className="px-3 py-1 text-blue-500 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-all"
      onClick={onclick}
    >
      Chi tiết
    </button>
  );
}
export { DeleteBtn, EditBtn, DetailBtn };
