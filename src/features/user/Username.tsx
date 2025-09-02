import { useAppSelector } from "../../hooks";

function Username() {
  const username = useAppSelector((state) => state.userReducer.username);

  if (!username) return null;

  return (
    <div className="text-sm font-semibold hidden md:block">{username}</div>
  );
}

export default Username;
