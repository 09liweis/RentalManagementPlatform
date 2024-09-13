"use client";

export default function Button({tl,handleClick,tp='primary'}) {
  
  return (
    <a className={`button ${tp}`} onClick={handleClick}>{tl}</a>
  )
}