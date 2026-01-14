import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const [sidebarPercent, setSidebarPercent] = useState(40);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser, navigate]);

  const onMouseDown = () => {
    setDragging(true);
    document.body.style.cursor = "col-resize";
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    if (percent >= 25 && percent <= 50) {
      setSidebarPercent(percent);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
    document.body.style.cursor = "default";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="flex h-screen w-screen overflow-hidden bg-black"
    >
      {/* SIDEBAR */}
      <div
        className="h-full"
        style={{ width: `${sidebarPercent}%` }}
      >
        <Sidebar />
      </div>

      {/* DRAG LINE */}
      <div
        onMouseDown={onMouseDown}
        className="w-[3px] cursor-col-resize bg-white/10 hover:bg-green-500"
      />

      {/* CHAT */}
      <div
        className="h-full"
        style={{ width: `${100 - sidebarPercent}%` }}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
