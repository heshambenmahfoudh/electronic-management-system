export default function capitlaiseLetter(title: string) {
  return title
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word?.slice(1).toLowerCase())
    .join(' ')
}
