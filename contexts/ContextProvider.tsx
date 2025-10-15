/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react'

export interface IContextData {
  activeMenu: boolean
  dashboardsDrop: boolean
  usersDrop: boolean
  pagePermission: boolean
  selectPagePermission: boolean
  openLogin: boolean
  sendMessageDrop: boolean
  reciveMessageDrop: boolean
  archiveMessageDrop: boolean
  officeDrop: boolean
  openViewModel: boolean
  backupDrop: boolean
  isLoading: boolean
  setActiveMenu: any
  setDashboardsDrop: any
  setUsersDrop: any
  setSendMessageDrop: any
  setReciveMessageDrop: any
  setArchiveMessageDrop: any
  setBackupDrop: any
  setOpenViewModel: any
  setPagePermission: any
  setOfficeDrop: any
  setSelectPagePermission: any
  setOpenLogin: any
  settingDrop: any
  setSettingDrop: any
  humanResourceDrop: any
  setHumanResourceDrop: any
  setIsLoading: any
  openNotification: any
  setOpenNotification: any
}

const StateContext = createContext<any>(false)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true)
  const [dashboardsDrop, setDashboardsDrop] = useState<boolean>(false)
  const [usersDrop, setUsersDrop] = useState<boolean>(false)
  const [sendMessageDrop, setSendMessageDrop] = useState<boolean>(false)
  const [reciveMessageDrop, setReciveMessageDrop] = useState<boolean>(false)
  const [archiveMessageDrop, setArchiveMessageDrop] = useState<boolean>(false)
  const [backupDrop, setBackupDrop] = useState<boolean>(false)
  const [openViewModel, setOpenViewModel] = useState<boolean>(false)
  const [officeDrop, setOfficeDrop] = useState<boolean>(false)
  const [humanResourceDrop, setHumanResourceDrop] = useState<boolean>(false)
  const [settingDrop, setSettingDrop] = useState<boolean>(false)
  const [pagePermission, setPagePermission] = useState<boolean>(false)
  const [selectPagePermission, setSelectPagePermission] = useState<boolean>(
    false,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [openNotification, setOpenNotification] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('resize', () => {
      window.innerWidth < 1150 ? setActiveMenu(false) : setActiveMenu(true)
    })
    return window.innerWidth < 1150 ? setActiveMenu(false) : setActiveMenu(true)
  }, [])

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        usersDrop,
        setUsersDrop,
        sendMessageDrop,
        setSendMessageDrop,
        pagePermission,
        setPagePermission,
        reciveMessageDrop,
        setReciveMessageDrop,
        archiveMessageDrop,
        setArchiveMessageDrop,
        backupDrop,
        setBackupDrop,
        dashboardsDrop,
        setDashboardsDrop,
        officeDrop,
        setOfficeDrop,
        selectPagePermission,
        setSelectPagePermission,
        openViewModel,
        setOpenViewModel,
        openLogin,
        setOpenLogin,
        settingDrop,
        setSettingDrop,
        isLoading,
        setIsLoading,
        openNotification,
        setOpenNotification,
        humanResourceDrop,
        setHumanResourceDrop,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)

export default ContextProvider
