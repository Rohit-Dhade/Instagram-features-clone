import { createContext, useState } from "react";

export const FollowerContext = createContext();

export const FollowerContextProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [FollowingList, setFollowingList] = useState(null);
  const [FollowerList, setFollowerList] = useState(null);
  const [OthersList, setOthersList] = useState(null)

  return (
    <FollowerContext.Provider
      value={{
        loading,
        setloading,
        FollowerList,
        setFollowerList,
        FollowingList,
        setFollowingList,
        OthersList,
        setOthersList
      }}
    >
      {children}
    </FollowerContext.Provider>
  );
};
