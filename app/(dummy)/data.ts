//  Links

export const className = 'flex  items-center gap-1 flex-row-reverse'

export const roleSuperAdminOptions = [
  { value: 'SUPER ADMIN', label: 'SUPER ADMIN' },
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'USER', label: 'USER' },
]
export const roleOptions = [
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'USER', label: 'USER' },
]
export const sexOptions = [
  { value: 'MALE', label: 'MALE' },
  { value: 'FEMALE', label: 'FEMALE' },
]
export const degreeOptions = [
  { value: 'Deploma', label: 'Deploma' },
  { value: 'Higher Deploma', label: 'Higher Deploma' },
  { value: 'Technical Deploma', label: 'Technical Deploma' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Postgraduate', label: 'Postgraduate' },
  { value: 'Bachelor`s', label: 'Bachelor`s' },
  { value: 'Master`s', label: 'Master`s' },
  { value: 'PhD', label: 'PhD' },
  { value: 'MbA', label: 'MbA' },
  { value: 'Postdoctoral', label: 'Postdoctoral' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Postdoctoral Fellowship', label: 'Postdoctoral Fellowship' },
  { value: 'Honorary Doctorate', label: 'Honorary Doctorate' },
]
export const academicTitleOptions = [
  { value: 'Teaching Assistant', label: 'Teaching Assistant' },
  { value: 'Instructor', label: 'Instructor' },
  { value: 'Lecture', label: 'Lecture' },
  { value: 'Senior Lecture', label: 'Senior Lecture' },
  { value: 'Assistant Professor', label: 'Assistant Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Distinguished Professor', label: 'Distinguished Professor' },
  { value: 'Visiting Professor', label: 'Visiting Professor' },
  { value: 'Adjunct Professor', label: 'Adjunct Professor' },
  { value: 'Emeritus Professor', label: 'Emeritus Professor' },
  { value: 'Clinical Professor', label: 'Clinical Professor' },
]
export const academicRankOptions = [
  { value: 'Entery-Level Academic', label: 'Entery-Level Academic' },
  { value: 'Mid-Level', label: 'Mid-Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Junior', label: 'Junior' },
  { value: 'Junior Faculty', label: 'Junior Faculty' },
  { value: 'Probationary Faculty', label: 'Probationary Faculty' },
  { value: 'Tenure-track', label: 'Tenure-track' },
  { value: 'Tenured', label: 'Tenured' },
  { value: 'Postdoctoral Researcher', label: 'Postdoctoral Researcher' },
  { value: 'Research Fellow', label: 'Research Fellow' },
  { value: 'Teaching Fellow', label: 'Teaching Fellow' },
]

export const permessionLinks = [
  {
    title: 'dashboard',
    active: false,
  },
  {
    title: 'settings',
    active: true,
  },
  {
    title: 'offices',
    active: true,
  },
  {
    title: 'users',
    active: true,
  },
  {
    title: 'sent messages',
    active: true,
  },
  {
    title: 'recive messages',
    active: true,
  },
  {
    title: 'archive messages',
    active: true,
  },
  {
    title: 'human resources',
    active: true,
  },
  {
    title: 'backup copy',
    active: true,
  },
]

export const usersLinks = [
  {
    text: 'users-data',
    link: '/dashboard/users',
    key: 'usersData',
  },
  {
    text: 'users-permissions',
    link: '/dashboard/users/users-permission/update',
    key: 'usersPermissions',
  },
]

export const officesLinks = [
  {
    text: 'offices-data',
    link: '/dashboard/offices',
    key: 'officeData',
  },
]

export const settingsLinks = [
  {
    text: 'office-profile',
    link: '/dashboard/settings/office-profile/update',
    key: 'officeProfile',
  },
  {
    text: 'user-profile',
    link: '/dashboard/settings/user-profile/update',
    key: 'userProfile',
  },
  {
    text: 'document-data',
    link: '/dashboard/settings/documents/update',
    key: 'document',
  },
]

export const sendMessagesLinks = [
  {
    text: 'type-messages',
    link: '/dashboard/sent-messages/type-messages',
    key: 'typeMessages',
  },
  {
    text: 'management-messages',
    link: '/dashboard/sent-messages/management-messages',
    key: 'managementMessages',
  },
]

export const reciveMessagesLinks = [
  {
    text: 'recive-messages',
    link: '/dashboard/recive-messages',
    key: 'reciveMessages',
  },
  {
    text: 'delayed-messages',
    link: '/dashboard/recive-messages/delayed-messages',
    key: 'delayMessages',
  },
]

export const archiveMessagesLinks = [
  {
    text: 'archive-department',
    link: '/dashboard/archive/archive-department',
    key: 'archiveDepartment',
  },
  {
    text: 'archive-sent-messages',
    link: '/dashboard/archive/archive-sent-messages',
    key: 'archiveSentMessages',
  },
  {
    text: 'archive-recive-messages',
    link: '/dashboard/archive/archive-recive-messages',
    key: 'archiveIncomingMessages',
  },
]

export const humanResourcesLinks = [
  {
    text: 'administrative-positions',
    link: '/dashboard/human-resources/administrative-positions',
    key: 'administrative',
  },
  {
    text: 'acadimic-departments',
    link: '/dashboard/human-resources/acadimic-departments',
    key: 'department',
  },
  {
    text: 'employees',
    link: '/dashboard/human-resources/employees',
    key: 'employee',
  },
]

export const backupLinks = [
  {
    text: 'take-backup-copy',
    link: '/dashboard/backup/take-backup-copy',
    key: 'takeBackup',
  },
]

export const dashboardLinks = [
  {
    text: 'overview',
    link: '/dashboard/home/overview',
    key: 'overview',
  },
  {
    text: 'logs',
    link: '/dashboard/logs',
    key: 'logs',
  },
]

export const officeColumn = [
  'imageUrl',
  'name',
  'email',
  'createdAt',
  'updatedAt',
]

export const userColumn = [
  'imageUrl',
  'name',
  'email',
  'role',
  'createdAt',
  'updatedAt',
]

export const typeMessageColumn = ['title', 'createdAt', 'updatedAt']

export const sentMessageColumn = [
  'fileName',
  'officeRecive.name',
  'typeMessage',
  'sentName',
  'date',
  'createdAt',
  'updatedAt',
]

export const reciveMessageColumn = [
  'fileName',
  'officeSent.name',
  'typeMessage',
  'sentName',
  'date',
  'createdAt',
  'updatedAt',
]

export const archiveSentMessageColumn = [
  'fileName',
  'officeRecive.name',
  'typeMessage',
  'sentName',
  'date',
  'archiveDate',
  'createdAt',
  'updatedAt',
]

export const archiveReciveMessageColumn = [
  'fileName',
  'officeSent.name',
  'typeMessage',
  'sentName',
  'date',
  'archiveDate',
  'createdAt',
  'updatedAt',
]

export const archiveSentMessageDashboardColumn = [
  'fileName',
  'officeRecive.name',
  'typeMessage',
  'archiveDate',
]

export const archiveReciveMessageDashboardColumn = [
  'fileName',
  'officeSent.name',
  'typeMessage',
  'archiveDate',
]

export const departmentArchiveColumn = ['title', 'createdAt', 'updatedAt']

export const delayMessageColumn = [
  'fileName',
  'officeSent.name',
  'officeRecive.name',
  'typeMessage',
  'sentName',
  'date',
  'delayDate',
  'createdAt',
  'updatedAt',
]

export const employeeColumn = [
  'imageUrl',
  'name',
  'sex',
  'qualification',
  'universiry',
  'fileName',
  'academicDegree',
  'academicTitle',
  'academicRank',
  'administrative.title',
  'faculity',
  'acadimicDepartment.title',
  'joinDate',
  'nationality',
  'dateOfBrith',
  'placeResidence',
  'email',
  'address',
  'createdAt',
  'updatedAt',
]

export const carouselItems = [
  {
    image: '/images/carousel1.jpg',
    title: 'Electronic management system',
    subtitle:
      'An integrated platform for managing messages',
  },
  {
    image: '/images/carousel2.jpg',
    title: 'Electronic Correspondence and archiving',
    subtitle:
      'A digital solution for tracking academic messages',
  },
  {
    image: '/images/carousel3.jpg',
    title: 'Academic and Correspondence management',
    subtitle: 'Organize archive, and exchange documents efficietly',
  },
]
