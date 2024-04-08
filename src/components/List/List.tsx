import { useState } from "react";
import { changeOrder, useGetQuotesQuery } from "../../store/slice";
import { ListItem } from "../ListItem/ListItem";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../store/store";

const CATEGORY = "Technology";

const ITEMS_PER_PAGE = 10;

export const ListWithControls = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useGetQuotesQuery(CATEGORY);
  const dispatch = useAppDispatch();

  const itemsPerPage = (data ?? []).slice(
    page * ITEMS_PER_PAGE,
    ITEMS_PER_PAGE * (page + 1)
  );

  if (isLoading) return <h5>Loading...</h5>;
  if (isError) return <h5>Error...</h5>;
  if (!data) return <h5>Error...</h5>;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dispatch(
      changeOrder({
        collectionName: CATEGORY,
        destinationIndex: destination.index,
        itemsPerPage: ITEMS_PER_PAGE,
        sourceIndex: source.index,
        page,
      })
    );
  };

  const isPrevButtonDisabled = page === 0;
  const isNextButtonDisabled =
    data[data.length - 1].companyName ===
    itemsPerPage[itemsPerPage.length - 1].companyName;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Exchange</th>
              <th>Average Total Volume</th>
              <th>Last trade</th>
              <th>Price</th>
              <th>Volume</th>
            </tr>
          </thead>
          <Droppable droppableId="uniqueDroppableId">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {itemsPerPage.map((item, index) => (
                  <ListItem
                    key={item.companyName}
                    quote={item}
                    index={index}
                    listIndex={page * ITEMS_PER_PAGE + index + 1}
                  />
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>

      <button
        disabled={isPrevButtonDisabled}
        onClick={() => setPage((prev) => prev - 1)}
      >
        prev
      </button>
      <button
        disabled={isNextButtonDisabled}
        onClick={() => setPage((prev) => prev + 1)}
      >
        next
      </button>
    </>
  );
};
