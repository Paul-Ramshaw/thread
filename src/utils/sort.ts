export default function sortBytDate(arr: any) {
  const newArr = [...arr];

  return newArr.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
