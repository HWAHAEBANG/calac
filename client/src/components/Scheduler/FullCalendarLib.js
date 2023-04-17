import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Box, Typography, styled } from "@mui/material";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/css/App.css";
import CategorySelectPart from "./CategorySelectPart";
import CategoryEditModal from "./CategoryEditModal";
import EventEditModal from "./EventEditModal";
import EventViewModal from "./EventViewModal";
import EventAddModal from "./EventAddModal";
import EventRender from "./EventRender";
import AlertControl from "./AlertControl";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../redux/user/actions";

const DemoApp = () => {
  // 상태관리 변수 ===============================================================================
  const [currentEvents, setCurrentEvents] = useState([]); // 현재 모든 이벤트둘
  const [categoryList, setCategoryList] = useState([]); // 카테고리 목록
  const [currentCategory, setCurrentCategory] = useState(""); // 현재 선택된 카테고리
  const [colorPickerVisible, setColorPickerVisible] = useState([]); // 컬리픽커 보이기 토글 (수정용)
  const [alertEvents, setAlertEvents] = useState([]); // 알림이 설정되어 있는 이벤트들
  // 리덕스 =====================================================================================
  const dispatch = useDispatch();
  const hasSidCookie = useSelector((state) => state.hasSidCookie);
  const session = useSelector((state) => state.session);
  // ===========================================================================================
  // [데이터 불러오기] #################################################################################
  // console.log("카테고리", categoryList);
  // console.log("이벤트", currentEvents);
  // console.log("쿠키", hasSidCookie);
  // console.log("세션", session);
  // 경고! 로그아웃해도 세션정보 남아있는 이슈 해결 요망

  useEffect(() => {
    // 세션 객체를 받아오는 함수 호출
    dispatch(getSession());
  }, [hasSidCookie]);

  // 카테고리 목록을 불러옴.
  useEffect(() => {
    if (!hasSidCookie || !session || !session.userInfo) return; // 세션 이슈 해결하면 session으로 해도 될듯
    axios
      .get(
        `http://calac.cafe24app.com/scheduler/category?currentUserNo=${session.userInfo.no}`
      )
      .then((response) => {
        setCategoryList(response.data);
        setCurrentCategory(response.data[0].value); // ok
        setColorPickerVisible(response.data.slice(1).map(() => false));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [hasSidCookie]); // 세션 이슈 해결하면 session으로 해도 될듯

  //이벤트 목록을 불러옴.
  useEffect(() => {
    if (!hasSidCookie || !session || !session.userInfo) return;
    axios
      .get(
        `http://calac.cafe24app.com/scheduler?currentUserNo=${session.userInfo.no}`,
        { withCredentials: true }
      )
      .then((response) => {
        // 알람이 설정된 이벤트들만 골라내기.
        const alertEvent = response.data; // 추후 filter돌릴 예정
        setAlertEvents(alertEvent);
        // 현재 카테고리와 일치하는 이벤트들만 골라내기.
        const filterdEvent = alertEvent.filter(
          (event) => event.color === currentCategory
        );
        if (categoryList[0] && currentCategory === categoryList[0].value) {
          setCurrentEvents(response.data);
        } else setCurrentEvents(filterdEvent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentCategory]);

  // [데이터 삽입] #################################################################################
  function handleChange(event) {
    setNewEvent({ ...newEvent, [event.target.name]: event.target.value });
  }
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
    locale: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };

  // 날짜 드래그 시 음영으로 선택됨.=============================================
  function handleDateSelect(selectInfo) {
    setNewEvent({
      // 선택된 기간의 시작과 끝 시간 저장
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    handleOpen(); // 새 이벤트 추가 모달 열기

    selectInfo.view.calendar.unselect(); // 선택된 기간 음영 해제
  }

  // 새 이벤트 저장 =============================================================
  function handleModalSubmit() {
    if (!hasSidCookie || !session || !session.userInfo) return;
    const { title, start, end, color, locale } = newEvent;
    // Send POST request to server to add new event
    // 필수 입력사항 미입력시 경고.
    if (!title && !color) {
      alert("일정 이름과 카테고리를 입력해주세요.");
      return;
    } else if (!title) {
      alert("일정 이름을 읿력해주세요.");
      return;
    } else if (!color) {
      alert("카테고리를 입력해주세요.");
      return;
    }

    // 새 이벤트 DB에 INSERT ======================================================

    axios
      .post("http://calac.cafe24app.com/scheduler/insert", {
        // (주의) id값 전송안함. DB 저장시 바로 생성
        title,
        start,
        end,
        color,
        locale,
        user_no: session.userInfo.no,
      })
      .then((response) => {
        alert("등록 완료!");
        // Add newly created event to calendar
        setCurrentEvents((currentEvents) => [
          // 성공시 UI에도 바로 반영
          ...currentEvents,
          {
            id: response.data.id,
            title: response.data.title,
            start: response.data.start,
            end: response.data.end,
            color: response.data.color,
            locale: response.data.locale,
            // allDay: false,
          },
        ]);
      })
      .catch(() => {
        alert("등록실패");
      })
      .finally(() => {
        handleClose(); // 새 이벤트 추가 모달 닫기
      });
  }
  // 중간에 나가면 데이터 지워지는 것도 잊지 말아야겠는걸?

  // [데이터 조회] #################################################################################
  const [detailLocation, setDetailLocation] = useState({
    x: 0,
    y: 0,
  });
  const [openDetail, setOpenDetail] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
    locale: "",
  });
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => {
    setOpenDetail(false);
    setUpdatedEvent({
      id: "",
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };
  // 이벤트를 클릭했을 때 동작 =================================================
  function handleEventClick(clickInfo) {
    /** 이벤트는 카테고리라는 키를 가지고 있지 않다. color라는 키에 색상코드를 저장하고 있을 뿐이다.
     * 이벤트를 클릭했을 때는 clickInfo.event.backgroundColor 로 접근하면 해당 color값을 받아올 수 있다.
     * UI 글씨를 보여주기 위해서는, 색상코드를 글씨로 파싱해주어야한다.
     */

    const parsingCategory = categoryList.filter(
      (category) => category.value === clickInfo.event.backgroundColor
    );

    setDetailLocation({
      // 클릭한 부분의 좌표를 저장
      x: clickInfo.jsEvent.clientX,
      y: clickInfo.jsEvent.clientY,
    });

    setUpdatedEvent({
      // 클릭이벤트에서 받아온 정보들로, 동적으로 데이터 출력
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      color: clickInfo.event.backgroundColor,
      category: parsingCategory && parsingCategory[0].label,
      locale: clickInfo.event.extendedProps.locale,
    });
    handleOpenDetail(); // 이벤트 조회 모달 열기
  }

  // [데이터 수정] #################################################################################
  // 이벤트의 날짜가 수정되었을 때, 저장 =========================================
  function handleEventChange(changeInfo) {
    axios // 새 이벤트 DB에 UPDATE
      .put(`http://calac.cafe24app.com/scheduler/update/${changeInfo.event.id}`, {
        title: changeInfo.event.title,
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        color: changeInfo.event.backgroundColor,
        locale: changeInfo.event.extendedProps.locale,
      })
      .then((response) => {
        // 성공시 UI에도 바로 반영
        changeInfo.event.setDates(response.data.startStr, response.data.endStr); // 뭐지이건?
        // 위 코드만 적용했을 경우 이벤트 날짜를 수정하자마자 이벤트 추가했을 때 바뀐 일자가 원래대로 돌아가는 현상 있음.
        // 아래의 코드를 추가한 뒤로부터 없어도, 정상작동하나 혹시 모르니 남겨놓기로 하였음.
        const test = currentEvents.filter(
          // 업데이트 하려하는 기존 데이터 삭제
          (item) => item.id !== parseInt(updatedEvent.id)
          // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
        );

        setCurrentEvents(() => [
          // 업데이트된 정보로 재생성
          ...test,
          {
            id: changeInfo.event.id,
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            color: changeInfo.event.backgroundColor,
            locale: changeInfo.event.extendedProps.locale,
            // allDay: false,
          },
        ]);
        alert("수정 완료!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 이벤트의 내용 편집 모달 열기 (연필버튼 눌리면 작동) ============================
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenDetail(false); // 조회 모달 닫기
    setOpenEdit(true); // 편집 모달 열기
  };

  // 입력되는 모든 변경사항 즉시 상태 관리 ============================================
  function handleEditChange(event) {
    setUpdatedEvent({
      ...updatedEvent,
      [event.target.name]: event.target.value,
    });
  }

  // 변경된 이벤트 저장 ==============================================================
  function handleEditModalSubmit() {
    const { title, start, end, color, locale } = updatedEvent;
    // Send POST request to server to add new event
    // 필수 입력사항 미입력시 경고.
    if (!title && !color) {
      alert("일정 이름과 카테고리를 입력해주세요.");
      return;
    } else if (!title) {
      alert("일정 이름을 읿력해주세요.");
      return;
    } else if (!color) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    axios // 새 이벤트 DB에 UPDATE
      .put(`http://calac.cafe24app.com/scheduler/update/${updatedEvent.id}`, {
        title: title,
        start: start,
        end: end,
        color: color,
        locale: locale,
      })
      .then((response) => {
        // 성공시 UI에도 바로 반영
        setOpenEdit(false); // 일단 편집모달 닫기

        const test = currentEvents.filter(
          // 업데이트 하려하는 기존 데이터 삭제
          (item) => item.id !== parseInt(updatedEvent.id)
          // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
        );

        setCurrentEvents(() => [
          // 업데이트된 정보로 재생성
          ...test,
          {
            id: response.data.id,
            title: response.data.title,
            start: response.data.start,
            end: response.data.end,
            color: response.data.color,
            locale: response.data.locale,
            // allDay: false,
          },
        ]);
        alert("수정 완료!");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // 중간에 나가면 데이터 지워지는 것도 잊지 말아야겠는걸?

  // 편집모달 닫기
  const handleCloseEdit = () => {
    setOpenEdit(false); // 편진모달 닫기
    setUpdatedEvent({
      // 업데이트용 상태 데이터 초기화
      id: "",
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };

  // [데이터 삭제] ###############################################################################################
  //  // 선택된 이벤트 삭제 (휴지통 버튼 눌리면 작동) ============================
  const handleEventDelete = () => {
    if (
      // 확인 한번 받고
      window.confirm(`'${updatedEvent.title}'일정을 완전히 삭제하시겠습니까?`)
    ) {
      axios // 새 이벤트 DB에 DELETE
        .delete(`http://calac.cafe24app.com/scheduler/delete/${updatedEvent.id}`)
        .then(() => {
          // 성공시 UI에도 바로 반영
          // Remove event from calendar
          const test = currentEvents.filter(
            (item) => item.id !== parseInt(updatedEvent.id)
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          setCurrentEvents(test);
          alert("삭제 완료!");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          handleCloseDetail();
        });
    }
  };

  // ####################################################################################################################
  // [카테고리 관련 함수] ###############################################################################################
  //category============================================
  const [categoryText, setCategoryText] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);

  const [tempColor, setTempColor] = useState("#fff"); // 선택 최종 선택이전까지 색상 선택상태
  const [pickedColor, setPickedColor] = useState(""); // 최종 선택된 상태
  const [pickedAddColor, setPickedAddColor] = useState(""); // 추가할 카테고리의 최종 선택된 상테
  // 카테고리 추가 ==========================================================================
  const handleAddCategory = () => {
    if (!hasSidCookie || !session || !session.userInfo) return;
    if (!categoryText) {
      alert("카테고리명을 입력해주세요.");
      return;
    }
    if (!pickedAddColor) {
      alert("색상을 선택해주세요.");
      return;
    }

    axios // DB에 INSERT
      .post("http://calac.cafe24app.com/scheduler/category/insert", {
        value: pickedAddColor,
        label: categoryText,
        user_no: session.userInfo.no,
      })
      .then((response) => {
        alert("등록 완료!");
        // Add newly created event to calendar
        setCategoryList((prev) => [
          ...prev,
          {
            id: response.data.id,
            value: response.data.value,
            label: response.data.label,
          },
        ]);
      })
      .catch(() => {
        alert("등록실패");
      })
      .finally(() => {
        handleClose();
        setCategoryText("");
        setPickedAddColor("");
      });
  };

  // 카테고리 삭제 ==========================================================================
  const handleDeleteCategory = (option) => {
    if (
      window.confirm(
        `'${option.label}' 카테고리를 완전히 삭제하시겠습니까? 포함된 일정도 모두 삭제됩니다.`
      )
    ) {
      axios // DB에서 카테고리 DELETE
        .delete(`http://calac.cafe24app.com/scheduler/category/delete/${option.id}`)
        .then(() => {
          // Remove event from calendar
          const test = categoryList.filter(
            (item) => item.id !== parseInt(option.id)
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          setCategoryList(test);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          handleCloseDetail();
        });

      const url = `http://calac.cafe24app.com/scheduler/event/color/delete/${encodeURIComponent(
        option.value
      )}`;

      axios // DB에서 해당 카테고리를 가진 이벤트도 모두 삭제
        .delete(url)
        .then(() => {
          // Remove event from calendar
          const test = currentEvents.filter(
            (item) => item.color !== option.value
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          setCurrentEvents(test);
          alert("삭제 완료!");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          handleCloseDetail();
        });
    }
  };

  // 카테고리 색상변경 ==========================================================================
  const updateColor = (option) => {
    axios // DB에 카테고리 UPDATE
      .put(`http://calac.cafe24app.com/scheduler/category/update/${option.id}`, {
        value: pickedColor,
        label: option.label,
      })
      .then((response) => {
        const test = categoryList.filter(
          (item) => item.id !== parseInt(option.id)
          // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
        );
        //새로만드는 개념이므로 맨뒤로가버림. 새로 고침하면 돌아옴.
        setCategoryList(() =>
          [
            ...test,
            {
              id: response.data.id,
              value: response.data.value,
              label: response.data.label,
            },
          ].sort((a, b) => a.id - b.id)
        );
        alert("수정 완료!");
      })
      .catch((error) => {
        console.error(error);
      });

    const url = `http://calac.cafe24app.com/scheduler/event/color/update/${encodeURIComponent(
      option.value
    )}`;
    axios // DB에 해당 카테고리를 가진 이벤드들 모두 UPDATE
      .put(url, {
        color: pickedColor,
      })
      .then(() => {
        setCurrentEvents(
          currentEvents.map((event) => {
            if (event.color === option.value) {
              return { ...event, color: pickedColor };
            } else {
              return event;
            }
          })
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setPickedAddColor(""));
  };

  // [참조] ====================================================================================
  /**
   * useState 를 사용하여 calendarApi 라는 상태 변수와 setCalendarApi 라는 상태 업데이트 함수를 생성합니다.
   * calendarApi 는 FullCalendar 인스턴스에 대한 참조를 저장하는데 사용됩니다.
   * useRef 를 사용하여 calendarRef 라는 ref 객체를 생성합니다.
   * 이 ref 객체는 FullCalendar 컴포넌트의 DOM 요소에 대한 참조를 저장합니다.
   * 첫번째 useEffect 는 컴포넌트가 마운트 또는 업데이트 될 때 실행됩니다.
   * calendarRef 의 현재 값을 가져와 FullCalendar 인스턴스를 초기화합니다.
   * FullCalendar 인스턴스가 준비되면 setCalendarApi 를 사용하여 calendarApi 상태를 업데이트합니다.
   * 두번째 useEffect 는 calendarApi 상태가 변경될 때마다 실행됩니다.
   * 이펙트는 calendarApi 가 준비되면 eventChange 이벤트를 구독하고, 이벤트가 발생할 때마다 handleEventChange 함수를 호출합니다.
   * 구독된 이벤트를 해제하려면 clean-up 함수를 반환합니다.
   *
   * calendarRef가 없으면 FullCalendar 컴포넌트의 DOM 요소에 대한 참조를 얻을 수 없으므로
   * FullCalendar 인스턴스를 초기화할 수 없음.
   * 이 경우 calendarApi를 업데이트 할 수 없으므로 FullCalendar 이벤트를 구독하고 처리할 수 없음
   * 결과적으로 calendarRef가 없으면 FullCalendar 컴포넌트가 제대로 작동하지 않을 것임
   * 따라서 calendarRef는 FullCalendar 컴포넌트와의 상호 작용에 필요한 중요한 요소임.
   */
  const [calendarApi, setCalendarApi] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      setCalendarApi(calendar.getApi());
    }
  }, [calendarRef]);

  useEffect(() => {
    if (calendarApi) {
      calendarApi.on("eventChange", handleEventChange);
      return () => {
        calendarApi.off("eventChange", handleEventChange);
      };
    }
  }, [calendarApi]);
  //============================================================================================
  // for modal ====
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    // focus 스타일 설정
    "&:focus": {
      border: "none",
      outline: "none",
    },
  };
  //==
  //category============================================
  return (
    <Box position='relative'>
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            height='90vh'
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              bootstrap5Plugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // locale={"ko"}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
            themeSystem='bootstrap5'
            buttonClassNames={{
              prev: "btn btn-primary",
              next: "btn btn-primary",
              today: "btn btn-primary",
              dayGridMonth: "btn btn-primary",
              dayGridWeek: "btn btn-primary",
              dayGridDay: "btn btn-primary",
            }}
            buttonText={{
              today: "TODAY",
              month: "MONTH",
              week: "WEEK",
              day: "DAY",
              list: "LIST",
            }}
            events={currentEvents}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
            eventRender={EventRender}
          />
        </div>
        {/* 이벤트 추가 모달 ========================================== */}
        <EventAddModal
          newEvent={newEvent}
          categoryList={categoryList}
          setNewEvent={setNewEvent}
          open={open}
          onChange={handleChange}
          onClose={handleClose}
          onModalSubmit={handleModalSubmit}
        />
        {/*========================================================== */}
        {/* 이벤트 보기 모달 ========================================= */}
        <EventViewModal
          updatedEvent={updatedEvent}
          detailLocation={detailLocation}
          openDetail={openDetail}
          onEventDelete={handleEventDelete}
          onOpenEdit={handleOpenEdit}
          onCloseDetail={handleCloseDetail}
        />
        {/*========================================================== */}
        {/* 이벤트 수정 모달 ========================================== */}
        <EventEditModal
          updatedEvent={updatedEvent}
          setUpdatedEvent={setUpdatedEvent}
          openEdit={openEdit}
          newEvent={newEvent}
          categoryList={categoryList}
          onEditChange={handleEditChange}
          onCloseEdit={handleCloseEdit}
          onEditModalSubmit={handleEditModalSubmit}
        />
        {/*========================================================== */}
        {/* 카테고리 선택 및 추가,제거================================= */}
        <CategorySelectPart
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
          categoryList={categoryList}
          onOpenCategory={handleOpenCategory}
        />
        {/* //======================================================= */}
        <CategoryEditModal
          openCategory={openCategory}
          onCloseCategory={handleCloseCategory}
          categoryList={categoryList}
          colorPickerVisible={colorPickerVisible}
          setColorPickerVisible={setColorPickerVisible}
          setPickedColor={setPickedColor}
          setPickedAddColor={setPickedAddColor}
          onUpdateColor={updateColor}
          onDeleteCategory={handleDeleteCategory}
          pickedAddColor={pickedAddColor}
          categoryText={categoryText}
          setCategoryText={setCategoryText}
          onAddCategory={handleAddCategory}
        />
        {/*========================================================== */}
      </div>
      <AlertControl alertEvents={alertEvents} />
    </Box>
  );
};

//style=================================================

const BlockBox = styled(Box)({
  zIndex: 100,
  position: "absolute",
  top: "0",
  left: "0",
  // backgroundColor: "red",
  color: "blue",
  // bgcolor: "rgba(193, 193, 193, .75)",
  // boxShadow : '0 6px 20px -15px #000',
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "colum",
  // gap: "20px",
});

//======================================================

export default DemoApp;
