import { Todo } from '../interfaces';

import { FC, PropsWithoutRef } from 'react';
import ListItem from './ListItem';

type ListProps = {
  data: Todo[];
  completedHandler: (id: number) => void;
  deleteHandler: (id: number) => void;
  sortHandler: (column: string) => void;
};

const tableHeaderData: { [key: string]: string } = { ID: 'id', Name: 'title', Status: 'completed' };

const List: FC<PropsWithoutRef<ListProps>> = ({
  data,
  completedHandler,
  deleteHandler,
  sortHandler,
}) => (
  <table data-testid='todo-list'>
    <thead>
      <tr>
        {Object.keys(tableHeaderData).map(key => (
          <th key={key} onClick={() => sortHandler(tableHeaderData[key])}>
            {key}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item: Todo, idx: number) => {
        return (
          <ListItem
            key={`#${item.id}`}
            item={item}
            handleDelete={deleteHandler}
            handleCompleted={completedHandler}
          />
        );
      })}
    </tbody>
  </table>
);

export default List;
