import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import "./css/mypage.css"

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MypageOne from "./MypageOne";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const Mypage = () => {
    const [users, setUser] = useState({})
    const [value, setValue] = useState(0);
    const [date2, setDate] = useState();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const getCurrentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        finduser()
    }, [])
    
    const finduser = () => {
        axios.get("http://localhost:8080/api/user", {params : getCurrentUser})
        .then(response => {
            setUser(response.data)
            console.log(response.data)
            const date = moment(response.data).format("YYYY-MM-DD")
            setDate(date)
        })
        .catch(e => {
            console.log(e)
        })
    }
    
    return (
        <div>
            <div className="mypagebox">
                <img src={"images/img1.jpg"}  alt="profileimg"/>
                <Box className="mypagebox-list" sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="내 정보" {...a11yProps(0)} />
                    <Tab label="주문확인" {...a11yProps(1)} />
                    <Tab label="내 정보 변경" {...a11yProps(2)} />
                    <Tab label="찜한 상품" {...a11yProps(3)} />
                </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className="tab-item">
                            아이디 : {users.userid}
                        </div>
                        <div className="tab-item">
                            이름 : {users.username}
                        </div>
                        <div className="tab-item">
                            이메일 : {users.email}
                        </div>
                        <div className="tab-item">
                            가입 날짜 : {date2}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MypageOne/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel>
                </Box>
            </div>
            {/* <footer></footer> */}
        </div>
    )
}

export default Mypage