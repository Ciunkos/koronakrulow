import React from "react";

import logoInner from "./logoinner.png";

const Logo = () => (
  <header className="logo-header">
    <div className="logo-container">
      <svg className="logo" viewBox="0 0 64 64">
        <path d="M56.9,42.9c-1.1-0.7-2.5-0.5-3.4,0.3l-2.8-1.6c1-2,1.7-4.1,2.1-6.4l4,0.4l0.2-2l-4-0.4c0-0.4,0.1-0.8,0.1-1.2  s0-0.8-0.1-1.2l4-0.4l-0.2-2l-4,0.4c-0.3-2.3-1.1-4.4-2.1-6.4l2.8-1.6c0.9,0.8,2.3,1,3.4,0.3c1.4-0.8,1.9-2.7,1.1-4.1  s-2.7-1.9-4.1-1.1c-1.1,0.7-1.7,1.9-1.4,3.1l-2.8,1.6c-1.2-1.9-2.8-3.6-4.5-5l2.4-3.3l-1.6-1.2l-2.4,3.3c-0.7-0.4-1.4-0.8-2.1-1.2  l1.6-3.7l-1.8-0.8l-1.6,3.7c-2.1-0.8-4.3-1.3-6.6-1.4V7.8c1.2-0.4,2-1.5,2-2.8c0-1.7-1.3-3-3-3s-3,1.3-3,3c0,1.3,0.8,2.4,2,2.8v3.2  c-2.3,0.1-4.5,0.6-6.6,1.4l-1.6-3.7l-1.8,0.8l1.6,3.7c-0.7,0.4-1.4,0.8-2.1,1.2l-2.4-3.3l-1.6,1.2l2.4,3.3c-1.8,1.4-3.3,3.1-4.5,5  L11.6,19c0.2-1.2-0.3-2.5-1.4-3.1C8.7,15.1,6.8,15.6,6,17s-0.3,3.3,1.1,4.1c1.1,0.7,2.5,0.5,3.4-0.3l2.8,1.6c-1,2-1.7,4.1-2.1,6.4  l-4-0.4l-0.2,2l4,0.4c0,0.4-0.1,0.8-0.1,1.2s0,0.8,0.1,1.2l-4,0.4l0.2,2l4-0.4c0.3,2.3,1.1,4.4,2.1,6.4l-2.8,1.6  c-0.9-0.8-2.3-1-3.4-0.3C5.7,43.7,5.2,45.6,6,47s2.7,1.9,4.1,1.1c1.1-0.7,1.7-1.9,1.4-3.1l2.8-1.6c1.2,1.9,2.8,3.6,4.5,5l-2.4,3.3  l1.6,1.2l2.4-3.3c0.7,0.4,1.4,0.8,2.1,1.2l-1.6,3.7l1.8,0.8l1.6-3.7c2.1,0.8,4.3,1.3,6.6,1.4v3.2c-1.2,0.4-2,1.5-2,2.8  c0,1.7,1.3,3,3,3s3-1.3,3-3c0-1.3-0.8-2.4-2-2.8v-3.2c2.3-0.1,4.5-0.6,6.6-1.4l1.6,3.7l1.8-0.8l-1.6-3.7c0.7-0.4,1.4-0.8,2.1-1.2  l2.4,3.3l1.6-1.2l-2.4-3.3c1.8-1.4,3.3-3.1,4.5-5l2.8,1.6c-0.2,1.2,0.3,2.5,1.4,3.1c1.4,0.8,3.3,0.3,4.1-1.1S58.3,43.7,56.9,42.9z   M44,46.8l-1.2-1.6l-1.6,1.2l1.2,1.6c-0.6,0.4-1.1,0.7-1.7,1l-0.8-1.8L38,47.9l0.8,1.8C37,50.4,35,50.8,33,50.9V49h-2v1.9  c-2-0.1-4-0.5-5.8-1.2l0.8-1.8l-1.8-0.8l-0.8,1.8c-0.6-0.3-1.2-0.6-1.7-1l1.2-1.6l-1.6-1.2L20,46.8c-1.5-1.3-2.9-2.7-4-4.4l1.7-1  l-1-1.7l-1.7,1c-0.9-1.7-1.5-3.6-1.8-5.6l1.9-0.2l-0.2-2L13.1,33c0-0.3-0.1-0.7-0.1-1s0-0.7,0.1-1l1.9,0.2l0.2-2L13.3,29  c0.3-2,0.9-3.9,1.8-5.6l1.7,1l1-1.7l-1.7-1c1.1-1.7,2.4-3.2,4-4.4l1.2,1.6l1.6-1.2l-1.2-1.6c0.6-0.4,1.1-0.7,1.7-1l0.8,1.8l1.8-0.8  l-0.8-1.8c1.8-0.7,3.8-1.1,5.8-1.2V15h2v-1.9c2,0.1,4,0.5,5.8,1.2L38,16.1l1.8,0.8l0.8-1.8c0.6,0.3,1.2,0.6,1.7,1l-1.2,1.6l1.6,1.2  l1.2-1.6c1.5,1.3,2.9,2.7,4,4.4l-1.7,1l1,1.7l1.7-1c0.9,1.7,1.5,3.6,1.8,5.6l-1.9,0.2l0.2,2l1.9-0.2c0,0.3,0.1,0.7,0.1,1  s0,0.7-0.1,1L49,32.8l-0.2,2l1.9,0.2c-0.3,2-0.9,3.9-1.8,5.6l-1.7-1l-1,1.7l1.7,1C46.8,44,45.5,45.5,44,46.8z" />
      </svg>
      <img className="logo-inner" src={logoInner} />
    </div>
    <div className="tagline">
      <h1>Korona Krulów</h1>
      <h3>Polityka w czasie zarazy</h3>
    </div>
  </header>
);

export default Logo;