/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserFormProps = {
  name: string
  email: string
  password: string
  imageUrl: string | null
  officeId: string
  role: string
}

export type TypeMessageFormProps = {
  title: string
  officeId: string
}
export type TypeManageMessageFormProps = {
  officeSentId: string
  officeReciveId: string
  sentToOffice?: string
  sentName: string
  typeMessage: string
  subject: string
  file: string
  fileName: string
  date: string
  notes: string
  createdAt?: string
  updatedAt?: string
}
export type OfficeFormProps = {
  name: string
  email: string
  password: string
  imageUrl: string
}
export type SelectOptionsType = { value: string; label: string }
export type FormOptionsDataType = {
  usersOptions?: SelectOptionsType[] | undefined
  officesOptions?: SelectOptionsType[] | undefined
  MessagesOptions?: SelectOptionsType[] | undefined
  departmentOptions?: SelectOptionsType[] | undefined
}

export type TypeDepartmentArchiveFormProps = {
  title: string
  officeId: string
}
export type TypeDepartmentAcademicFormProps = {
  title: string
  officeId: string
}
export type TypeDataTableProps = {
  data: any
  columns: any
  linkToCreate?: string
  onUpdated?: boolean
  onDeleted?: boolean
  linkToUpdate?: string
  linkToView?: string
  onView?: boolean | undefined
  titleToCreate?: string
  endPoint?: string
  resourceName?: string
  isPage?: string
  handleClickGetId?: any
}

export type TypeActionData = {
  onUpdated?: boolean
  onDeleted: boolean
  linkToUpdate?: string
  linkToView?: string
  onView?: boolean
  id: string
  resourceName?: string
  handleClickGetId?: any
}

export type TypeViewMessageProps = {
  id: string
  initialData: string
}
export type TypeArchiveAndDelayProps = {
  typeOperation: string
  id?: string
  officeSentId: string
  officeReciveId: string
  departmentArciveId: string
  typeMessage: string
  subject: string
  sentName: string
  file: string
  archiveTo?: string
  delay?: string
  fileName: string
  date: string
  archiveDate: string
  delayDate: string
  notes: string
  path?: string
}

export type TypeLoginFormProps = {
  email: string
  password: string
}

export type TypeSesstionData = {
  id: string
  name: string
  email: string
  imageUrl: string
  office?: TypeOffice
  role?: string
}

type TypeOffice = {
  id?: string
  name: string
  email?: string
  imageUrl?: string
}
type TypeUser = {
  id: string
  name: string
  email: string
  imageUrl: string
  role?: string
  office?: TypeOffice
}
export type TypeSessionState = {
  user: TypeUser | null
  loading: boolean
  error: string | null
  fetchData: () => Promise<void>
  clearSession: () => Promise<void>
}

export type typeMessageArchive = {
  officeSent: { id: string; name: string }
  officeRecive: { id: string; name: string }
  departmentArcive?: string
  typeMessage: string
  sentName: string
  file: string
  fileName: string
  date: string
  notes?: string
  archiveDate: string | null
  officeReciveId?: string
  officeSentId?: string
  createdAt?: string
  updatedAt?: string
}

export type typeRouteData = {
  text: string
  link: string
  key: string
}

export type userLogForm = {
  userId: string | undefined
  officeId: string | undefined
  activity: string
}
export type typeKeyPermission = {
  [key: string]: boolean
}

type TypeUserLogData = {
  id: string
  userId?: string
  officeId?: string
  activity: string
  ipAdress: string
  device: string
  createdAt: string
}
export type TypeUserLogsGroupDate = {
  [logDate: string]: TypeUserLogData[]
}

export type TypeMessageArchive = {
  id: string
  officeSent: { id: string; name: string }
  officeRecive: { id: string; name: string }
  sentName: string
  typeMessage: string
  subject: string
  file: string
  fileName: string
  date: string
  notes: string
  departmentArciveId: string
  archiveDate: string
  createdAt: string
  updatedAt: string
}
