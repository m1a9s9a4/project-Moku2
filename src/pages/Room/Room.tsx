import React from 'react';

const Room: React.FC = () => {
  return (
    <div>
      <div className="leftWrapper">
        <header className="roomHeader">
          Mokux2
        </header>
        <div className="roomContent">
          入場しました！
          現在〇〇人が作業中です。
        </div>
      </div>
      <div className="rightWrapper">
        <h3>オンライン</h3>
        <ul>
          <li className="onlineUserWrapper">
            <span className="onlineIcon">○</span>
            <span className="onlineUser">Aさん</span>
          </li>
          <li className="onlineUserWrapper">
            <span className="onlineIcon">○</span>
            <span className="onlineUser">Aさん</span>
          </li>
          <li className="onlineUserWrapper">
            <span className="onlineIcon">○</span>
            <span className="onlineUser">Aさん</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Room;