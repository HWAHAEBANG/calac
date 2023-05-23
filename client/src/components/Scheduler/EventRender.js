import React from "react";

function EventRender({ event, el }) {
  // 이벤트 요소에 클래스를 추가하여 동그라미를 표시합니다.
  el.classList.add("fc-event-circle");

  // 이벤트 요소의 ::before 가상 요소에 스타일을 추가하여 동그라미를 그립니다.
  const style = `
    content: '';
    position: absolute;
    top: 0;
    left: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${event.backgroundColor};
    border: 2px solid ${event.borderColor};
  `;
  el.style.position = "relative";
  el.style.paddingLeft = "12px";
  el.style.setProperty("--fc-event-circle-style", style);

  return el;
}

export default EventRender;
