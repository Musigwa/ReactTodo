import { BsCheck2Circle } from 'react-icons/bs';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import { Todo } from '../interfaces';
import { capitalize } from '../utils';

import { FC, PropsWithoutRef } from 'react';

type ListItemProps = {
  item: Todo;
  handleCompleted: (id: number) => void;
  handleDelete: (id: number) => void;
};

const ListItem: FC<PropsWithoutRef<ListItemProps>> = ({ item, handleCompleted, handleDelete }) => {
  return (
    <tr key={`#${item.id}`}>
      <td style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.id}</td>
      <td style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
        {capitalize(item.title)}
      </td>
      <td>
        {item.completed ? (
          <BsCheck2Circle
            className={`completed button`}
            size={25}
            onClick={() => handleCompleted(item.id)}
          />
        ) : (
          <RiCheckboxBlankCircleLine
            className={`button`}
            size={25}
            onClick={() => handleCompleted(item.id)}
          />
        )}
      </td>
      <td>
        <TiDelete size={25} className={`delete-btn button`} onClick={() => handleDelete(item.id)} />
      </td>
    </tr>
  );
};

export default ListItem;
