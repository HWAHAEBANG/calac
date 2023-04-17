import { Box, Button, ButtonGroup, Paper, Typography, Avatar, CircularProgress } from "@mui/material";
import { useVisualCrossing } from "react-open-weather";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import temp from "../../assets/images/weather/temp.svg";
import humidity from "../../assets/images/weather/humidity.svg";
import wind from "../../assets/images/weather/wind.svg";
import { useState } from "react";

const Weather = () => {
  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: "A6R5QZFRRM8J7RFK8VXTK5LJV",
    lat: "37.3358",
    lon: "126.5842",
    lang: "en",
    unit: "metric", // values are (metric,us,uk)
  });

  const [day, setDay] = useState(0);

  const CountDown = () => {
    if (day > 0) {
      setDay((prev) => prev - 1);
    }
  };

  const CountUp = () => {
    if (day < 2) {
      setDay((prev) => prev + 1);
    }
  };

  return (
    <>
      {isLoading && <CircularProgress sx={{ marginLeft: "50px" }} />}
      {errorMessage && (
        <Typography>
          날씨 정보를 불러울 수 없습니다. 위치정보 승인 설정을 확인해주세요.
        </Typography>
      )}
      {data && (
        <Box>
          <Paper elevation={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant='button'
                marginRight={2}
                color='primary'
                fontWeight={700}
                sx={{ lineHeight: "0" }}
              >
                {data.forecast[day].date}
              </Typography>
              <ButtonGroup
                aria-label='small button group'
                sx={{ borderColor: "#07553B" }}
              >
                { (day !== 0 ) && (
                  <WeatherButton onClick={CountDown}>
                    <ChevronLeftIcon />
                  </WeatherButton>
                )}
                { (day !== 2 ) && (
                  <WeatherButton onClick={CountUp}>
                    <ChevronRightIcon />
                  </WeatherButton>
                )}
              </ButtonGroup>
            </Box>
            <Typography variant='caption'>Seoul, Republic of Korea</Typography>
            <WeatherBox>
              <WeatherBox>
                <WeatherBox>
                  <WeatherAvatar alt='emy Sharp' src={temp} />
                </WeatherBox>
                <Typography variant='button' marginLeft={1} marginRight={2}>
                  Max {data.forecast[day].temperature.max}˚C &nbsp; 
                  Min{" "}{data.forecast[day].temperature.min}˚C
                  {/* {" "}의 정체는? */}
                </Typography>
              </WeatherBox>
              <WeatherBox>
                <WeatherBox>
                  <WeatherAvatar alt='emy Sharp' src={humidity} />
                </WeatherBox>
                <Typography variant='button' marginLeft={1} marginRight={2}>
                  {data.forecast[day].humidity} %
                </Typography>
              </WeatherBox>
              <WeatherBox>
                <WeatherBox>
                  <WeatherAvatar alt='emy Sharp' src={wind} />
                </WeatherBox>
                <Typography variant='button' marginLeft={1}>
                  {data.forecast[day].wind} km/h
                </Typography>
              </WeatherBox>
            </WeatherBox>
          </Paper>
        </Box>
      )}
    </>
  );
};

//style=================================================
const WeatherBox = styled(Box)(`
  display: flex;
  align-items: center;
`);

const WeatherAvatar = styled(Avatar)(`
  width: 20px;
  height: 20px;
`);

const WeatherButton = styled(Button)(`
  height: 18px;
  width: 10px;
`);
//======================================================

export default Weather;
