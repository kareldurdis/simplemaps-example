import React, { CSSProperties, memo } from 'react';
import { FixedSizeList as List, areEqual } from 'react-window';
import { Col, Text } from '@nextui-org/react';
import type { State } from './index';
import styles from './TreeView.module.css';

type TreeViewProps = {
  treeData: State[];
};

type RowProps = {
  index: number;
  style: CSSProperties;
};

const Row = memo(({ data, index, style }) => {
  // Data passed to List as "itemData" is available as props.data
  const { items, toggleItemActive } = data;
  const item = items[index];

  return (
    <div onClick={() => toggleItemActive(index)} style={style}>
      {item.label} is {item.isActive ? 'active' : 'inactive'}
    </div>
  );
}, areEqual);

const TreeView = ({ treeData }: TreeViewProps) => {
  console.log(treeData);

  const Row = React.memo(({ index, style }: RowProps) => (
    <div className={index % 2 ? styles.ListItemOdd : styles.ListItemEven} style={style}>
      {treeData[index].name}
    </div>
  ));
  Row.displayName = 'Row';

  return (
    <Col>
      <Text h2>State</Text>
      <List
        className={styles.List}
        height={300}
        itemCount={treeData.length}
        itemSize={35}
        width={300}
      >
        {Row}
      </List>
    </Col>
  );
};

export default TreeView;
