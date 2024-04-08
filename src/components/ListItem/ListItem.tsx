import React from "react";
import { getFormattedDate } from "../../lib/getFormattedTime";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  quote: Quote;
  index: number;
  listIndex: number;
};

export const ListItem = ({
  quote: {
    avgTotalVolume,
    companyName,
    lastTradeTime,
    latestPrice,
    latestVolume,
    primaryExchange,
  },
  listIndex,
  index,
}: Props) => {
  const formattedLastTradeDate = getFormattedDate(lastTradeTime);

  return (
    <Draggable draggableId={companyName} index={index}>
      {(provided) => (
        <tr
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-testid='tableRowDataTestId'
        >
          <td>{listIndex}</td>
          <td>{companyName}</td>
          <td>{primaryExchange}</td>
          <td>{avgTotalVolume || "none"}</td>
          <td>{formattedLastTradeDate}</td>
          <td>{latestPrice ? latestPrice + "$" : "none"}</td>
          <td>{latestVolume}</td>
        </tr>
      )}
    </Draggable>
  );
};
