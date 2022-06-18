import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import React, { useEffect, useState } from "react";

type Props = {
  childern: React.ReactNode;
};

export const DnDMulti: React.FC<Props> = ({ childern }) => {
  const [provider, setProvider] = useState<any>();

  const isTouchDevice = () => {
    if ("ontouchstart" in window) {
      setProvider(true);
    } else {
      setProvider(false);
    }
  };
  useEffect(() => {
    isTouchDevice();
  }, []);

  return (
    <DndProvider backend={provider ? TouchBackend : HTML5Backend}>
      {childern}
    </DndProvider>
  );
};
