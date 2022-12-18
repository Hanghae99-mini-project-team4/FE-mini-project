import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { __addComment, __getComments } from "../redux/modules/commentsSlice";
import contentsSlice, { __getContent } from "../redux/modules/contentsSlice";
import Button from "./Button";

function CommentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  
  const {id} = useParams();
  const contentId = id

  const onAddHandler = async (e) => {
    e.preventDefault()
    if (content.trim() === "") {
      alert("공백을 채워주세요")
      return
    }
    if(!window.confirm("추가 하겠습니까?")){
      return
    } else {
      await dispatch(__addComment({content, contentId}))
      dispatch(__getComments(id))
      setContent("")
    }
  }

  return (
    <Box>
      Comment Form
      <FormBox method="post" onSubmit={onAddHandler}>
        <InputTitle
          required
          type="text"
          value = {content}
          placeholder="댓글 입력"
          onChange={(event)=>setContent(event.target.value)}
        ></InputTitle>
        <SubBtn onSubmit={onAddHandler}>추가</SubBtn>
      </FormBox>
    </Box>
  )
}

export default CommentForm;

const Box = styled.div`
  border: 2px solid black;
  padding: 20px;
  margin: 20px auto;
  width: 800px;
`;

const FormBox = styled.form`
  display: flex;
  justify-content: center;
  margin: 10px;
`;
const InputTitle = styled.input`
  border : none;
  padding: 10px;
  border-bottom: 2px solid var(--color2);
  flex: 1;
`;

const SubBtn = styled(Button)`
  height:40px;
  width: 100px;
  margin: auto;
`;