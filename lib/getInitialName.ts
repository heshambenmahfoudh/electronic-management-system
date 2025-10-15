export default function getInitialName(name: string | undefined): string {
  const words = name?.split(' ')
  const initial = words?.map((w) => w?.charAt(0))?.join('')
  return initial?.toUpperCase() as string
}
