import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __addContent, __patchContent } from "../../redux/modules/contentsSlice";

import styled from "styled-components";
import Button from "../feature/Button";

import Swal from "sweetalert2";

function ModifyForm() {
  const { id } = useParams();
  const { content } = useSelector((state) => state.contents);
  const initialContent = {
    title: content.title,
    content: content.content,
  };

  const [isClick, setClick] = useState(false);
  const navigate = useNavigate();
  const { msg } = useSelector((state) => state.contents);
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState(initialContent);
  const changeInput = (e) => {
    const { name, value } = e.target;
    setNewContent({ ...newContent, [name]: value });
  };

  const onPatchHandler = async (e) => {
    e.preventDefault();
    if (newContent.title.trim() === "" || newContent.content.trim() === "") {
      Swal.fire("", "공백을 채워주세요.", "");
      return;
    }
    Swal.fire({
      title: "수정 하겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "수정",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(__patchContent({ id, newContent }));
        setClick(true);
      }
    });
  };

  useEffect(() => {
    if (!isClick) return;
    if (msg === "success" && isClick) {
      navigate(`../detail/${id}`);
    }
  }, [msg, isClick]);

  return (
    <FormBox method="post" onSubmit={onPatchHandler}>
      <InputTitle
        required
        type="text"
        name="title"
        defaultValue={newContent.title}
        maxLength="24"
        onChange={changeInput}
        placeholder="제목 입력"
      ></InputTitle>

      <InputBody
        required
        name="content"
        defaultValue={newContent.content}
        onChange={changeInput}
        placeholder="내용 입력"
      ></InputBody>
      <SubBtn onSubmit={onPatchHandler}>수정</SubBtn>
    </FormBox>
  );
}

export default ModifyForm;

const FormBox = styled.form`
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  font-size: 24px;
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const InputTitle = styled.input`
  border: none;
  padding: 10px;
  border-bottom: 2px solid var(--color2);
`;

const InputBody = styled.textarea`
  border: 2px solid var(--color2);
  height: 250px;
  padding: 10px;
  resize: none;
`;
const SubBtn = styled(Button)`
  height: 50px;
  width: 200px;
  margin: auto;
`;
