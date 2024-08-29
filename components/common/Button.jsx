"use client";

export default function Button({tl,handleClick}) {
  return (
    <a className="button" onClick={handleClick}>{tl}</a>
  )
}