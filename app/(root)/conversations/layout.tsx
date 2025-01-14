import React from "react";
import ItemList from "../../../components/shared/item-list/ItemList";

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  return (
    <>
      <ItemList title="Conversation">Conversation Page</ItemList>
      {children}
    </>
  );
};

export default layout;
