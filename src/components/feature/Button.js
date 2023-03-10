import React from "react";
import styled from "styled-components";

const StBtn = styled.button`
  border: none;
  background-color: var(--color3);
  color: white;
  border-radius: 5px;
  &:hover {
    &:not([disabled]){
    background-color: white;
    color: Black;
    border: 3px solid var(--color3);
  }}
`;

const Button = (props) => {
  return (
    <StBtn
      className={props.className}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      disabled={props.disabled}
    >
      {props.children}
    </StBtn>
  );
};

export default Button;
