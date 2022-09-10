import React, { createContext, useContext, useEffect, useState } from "react";
import { Comments } from "../types";

interface PropTypes {
  children: React.ReactNode;
}

export type CommentContextType = {
  comments: Comments[];
  setComments: (comments: Comments[]) => void;
};

const CommentContext = createContext<CommentContextType | null>(null);

const CommentsProvider = (props: PropTypes) => {
  const [comments, setComments] = useState<Comments[]>([]);

  const values = { comments, setComments };

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  return (
    <CommentContext.Provider value={values}>
      {props.children}
    </CommentContext.Provider>
  );
};

const useComments = () => useContext(CommentContext);

export { CommentsProvider, useComments };
