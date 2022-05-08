import React, { CSSProperties, memo } from 'react';
import { FixedSizeList as List, areEqual } from 'react-window';
import { Button, Card, Col, Divider, Text } from '@nextui-org/react';
import { FiXCircle } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './styles.module.css';

type TreeViewProps = {
  items: any[];
  activeItem: any;
  setActiveItem: any;
  title?: string;
};

type RowProps = {
  data: {
    activeItem: any;
    items: any[];
    toggleItemActive: Function;
  };
  index: number;
  style: CSSProperties;
};

const Row = memo(({ data, index, style }: RowProps) => {
  // Data passed to List as "itemData" is available as props.data
  const { items, activeItem, toggleItemActive } = data;
  const item = items[index];
  const active = activeItem ? activeItem.id === item.id : false;

  return (
    <div
      className={classNames(styles.listItem, active ? styles.activeItem : undefined)}
      onClick={() => toggleItemActive(item)}
      style={style}
    >
      {item.name}
    </div>
  );
}, areEqual);
Row.displayName = 'Row';

const createItemData = (items: any[], activeItem: any, toggleItemActive: any) => ({
  items,
  activeItem,
  toggleItemActive,
});

const ListView = ({ items, activeItem, setActiveItem, title }: TreeViewProps) => {
  const itemData = createItemData(items, activeItem, setActiveItem);

  return (
    <Col className={styles.container}>
      <Card>
        {title && (
          <Card.Header className={styles.cardHeader}>
            <Text h3>{title}</Text>
            {activeItem && (
              <Button
                className={styles.closeButton}
                title="Reset selection"
                icon={<FiXCircle size={32} color="black" />}
                onClick={() => setActiveItem(undefined)}
              />
            )}
          </Card.Header>
        )}
        <Divider />
        <Card.Body css={{ py: '$10' }}>
          <List
            className={styles.list}
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
