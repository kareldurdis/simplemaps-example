import React, { CSSProperties, memo } from 'react';
import { FixedSizeList as List, areEqual } from 'react-window';
import { Card, Col, Divider, Text } from '@nextui-org/react';
import { StateObject } from 'src/utils/createTree';
import styles from './styles.module.css';

type TreeViewProps = {
  items: any[];
  setActiveItem: any;
  title?: string;
};

type RowProps = {
  data: {
    items: StateObject[];
    toggleItemActive: () => void;
  };
  index: number;
  style: CSSProperties;
};

const Row = memo(({ data, index, style }) => {
  // Data passed to List as "itemData" is available as props.data
  const { items, toggleItemActive } = data;
  const item = items[index];

  return (
    <div onClick={() => toggleItemActive(item)} style={style}>
      {item.name}
    </div>
  );
}, areEqual);
Row.displayName = 'Row';

const createItemData = (items: StateObject[], toggleItemActive: any) => ({
  items,
  toggleItemActive,
});

const ListView = ({ items, setActiveItem, title }: TreeViewProps) => {
  // console.log(treeData);

  const itemData = createItemData(items, setActiveItem);

  return (
    <Col>
      <Card css={{ mw: '290px' }}>
        {title && (
          <Card.Header>
            <Text h3>{title}</Text>
          </Card.Header>
        )}
        <Divider />
        <Card.Body css={{ py: '$10' }}>
          <List
            className={styles.List}
            height={300}
            itemCount={items.length}
            itemSize={35}
            itemData={itemData}
            width={250}
          >
            {Row}
          </List>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ListView;
