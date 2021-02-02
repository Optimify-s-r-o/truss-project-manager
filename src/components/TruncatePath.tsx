import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Tooltip from './Optimify/Tooltip';

interface OwnProps {
  children: string;
}

// inspired by https://stackoverflow.com/questions/45569394/truncate-text-in-the-middle-of-a-series-of-divs
const TruncatePath = (props: OwnProps) => {
  const [content, setContent] = useState(props.children);
  const [shadowContent, setShadowContent] = useState(props.children);
  const [segments, setSegments] = useState(10);
  const [fileNameLength, setFileNameLength] = useState(
    props.children.substr(props.children.lastIndexOf('\\') + 1).length
  );
  const [fireRecalculation, setFireRecalculation] = useState(Math.random());
  const div = useRef<HTMLDivElement>();

  useEffect(() => {
    recalculate();
    window.addEventListener('resize', resetAndRecalculate);

    return () => {
      window.removeEventListener('resize', resetAndRecalculate);
    };
  }, []);

  useEffect(() => {
    if (div.current.scrollWidth > div.current.offsetWidth) {
      if (segments > 0) setSegments(segments - 1);
      else setFileNameLength(fileNameLength - 1);
      recalculate();
    } else setContent(shadowContent);
  }, [fireRecalculation]);

  const resetAndRecalculate = () => {
    setSegments(10);
    setFileNameLength(
      props.children.substr(props.children.lastIndexOf('\\') + 1).length
    );
    recalculate();
  };

  const recalculate = () => {
    const elContentArr = props.children.split('\\');

    let newContent;

    if (segments > 0) {
      newContent = []
        .concat(
          elContentArr.slice(0, segments / 2),
          ['...'],
          elContentArr.slice(-(segments - segments / 2))
        )
        .join('\\');
    } else {
      newContent = '...' + props.children.substr(-fileNameLength + 3);
    }

    setShadowContent(newContent);
    setFireRecalculation(Math.random());
  };

  return (
    <Truncate>
      <Tooltip title={props.children} placement={'bottom'}>
        {content}
      </Tooltip>
      <ShadowContent ref={div}>{shadowContent}</ShadowContent>
    </Truncate>
  );
};

export default TruncatePath;

const Truncate = styled.div`
  position: relative;
  overflow: hidden;

  white-space: nowrap;
`;

const ShadowContent = styled.div`
  position: absolute;
  overflow: visible;

  top: 0;
  right: 0;
  left: 0;

  white-space: nowrap;

  visibility: hidden;
`;
