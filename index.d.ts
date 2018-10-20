import React from "react";

interface DropdownProps {
  headers: Array<{ title: string; key: string | number; height?: number }>;

  onAnimationStart: () => void;
  onAnimationEnd: () => void;
  onCloseStart: () => void;
  onCloseEnd: () => void;
  renderHeaderItem: (
    item: { title: string; key: string | number; height?: number },
    index: nunmber,
    active: boolean
  ) => React.ReactNode;
  activeTextColor: "#1890ff";
}

export default class Dropdown extends React.Component<DropdownProps, {}> {}
