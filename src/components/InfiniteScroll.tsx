import React,{ FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";

type Props = {
  onBottomHit: () => void;
  hasMoreData: boolean;
  loadOnMount: boolean;
  children: ReactNode;
};

function isBottom(ref: RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false;
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

const InfiniteScroll: FC<Props> = ({
  onBottomHit,
  hasMoreData,
  loadOnMount,
  children,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit();
      setInitialLoad(false);
    }
  }, [onBottomHit, loadOnMount, initialLoad]);

  useEffect(() => {
    const onScroll = () => {
      if (hasMoreData && isBottom(contentRef)) {
        onBottomHit();
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [onBottomHit, hasMoreData]);

  return <div ref={contentRef}>{children}</div>;
};

export default InfiniteScroll;