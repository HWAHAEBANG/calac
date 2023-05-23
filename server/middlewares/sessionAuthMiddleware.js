// 세션 검증 로직
const isValidSession = (sessionCookie, sessionObject) => {
  // 세션 정보가 존재하고 세션 ID가 일치하는지 확인

  console.log("세션", sessionCookie);
  console.log("세션객체", sessionObject);

  if (sessionObject && sessionObject.sid === sessionCookie.sid) {
    // 세션 유효
    console.log("세션 유효");
    return true;
  }

  // 세션 유효하지 않음
  console.log("세션 유효하지 않음");
  return false;
};

// 세션 검증 미들웨어
const sessionAuthMiddleware = (req, res, next) => {
  // 세션 쿠키에서 세션 정보를 가져옵니다.
  const sessionCookie = req.cookies.session;
  const sessionObject = req.session;

  // 세션 정보가 없으면 인증되지 않은 상태로 처리합니다.
  if (!sessionCookie) {
    console.log("세션이 없습니다.");
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 세션 정보를 검증하고 유효한 사용자인지 확인하는 로직을 수행합니다.
  if (isValidSession(sessionCookie, sessionObject)) {
    // 유효한 세션인 경우, 요청에 세션 정보를 추가하고 다음 미들웨어로 이동합니다.
    // req.session = session; // ?? 왜 추가함?
    console.log("세션이 인증되었습니다.");
    next();
  } else {
    // 유효하지 않은 세션인 경우, 인증 실패로 처리합니다.
    console.log("유효하지 않은 세션입니다.");
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = sessionAuthMiddleware;
