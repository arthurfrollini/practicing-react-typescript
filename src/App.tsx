import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://randomuser.me/',
});

interface UserName {
  first: string;
  last: string;
  title: string;
}

interface UserInfo {
  name: UserName;
}

const getFullUserName = (userInfo: UserInfo) => {
  const {
    name: { first, last },
  } = userInfo;
  return `${first} ${last}`;
};

function App() {
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const { data } = await api.get('api');
      setUserInfos(data.results);
    }
    fetchUserData();
  }, []);

  return (
    <>
      {userInfos.map((userInfo: UserInfo, idx) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
        </div>
      ))}
    </>
  );
}

export default App;
