import React, { CSSProperties, memo } from 'react';
import { FixedSizeList as List, areEqual } from 'react-window';
import { Card, Col, Divider, Text } from '@nextui-org/react';
import { State } from 'src/utils/createTree';
import styles from './TreeView.module.css';

type TreeViewProps = {
  treeData: State[];
  setActiveItem: any;
};

type RowProps = {
  data: {
    items: State[];
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

const createItemData = (items: State[], toggleItemActive: any) => ({
  items,
  toggleItemActive,
});

const TreeView = ({ treeData, setActiveItem }: TreeViewProps) => {
  // console.log(treeData);

  const itemData = createItemData(treeData, setActiveItem);

  return (
    <Col>
      <Card css={{ mw: '330px' }}>
        <Card.Header>
          <Text h3>State</Text>
        </Card.Header>
        <Divider />
        <Card.Body css={{ py: '$10' }}>
          <List
            className={styles.List}
            height={300}
            itemCount={treeData.length}
            itemSize={35}
            itemData={itemData}
            width={290}
          >
            {Row}
          </List>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TreeView;
