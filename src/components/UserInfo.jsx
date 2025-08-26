
// import React, { useEffect, useState } from 'react';
// import { auth } from '../firebaseConfig';

// const UserInfo = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
//       setUser(firebaseUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="vault-badge">
//       <span className="vault-id">🟣 Agent Access</span>
//       <span className="vault-name">{user.displayName || 'Anonymous'}</span>
//     </div>
//   );
// };

// export default UserInfo;

// src/components/UserInfo.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="user-info-glow">
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="Agent"
          className="user-avatar"
        />
      )}
      <span className="vault-id">🟣 Agent Access</span>
      <span className="vault-name">{user.displayName || 'Anonymous'}</span>
      <span className="vault-id">{user.email}</span>
    </div>
  );
};

export default UserInfo;
