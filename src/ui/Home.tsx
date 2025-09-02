import CreateUser from "../features/user/CreateUser";
import { useAppSelector } from "../hooks";
import Button from "./Button";

function Home() {
  const username = useAppSelector((store) => store.userReducer.username);

  return (
    <div className="my-10 text-center sm:my-16 px-4">
      <h1 className="mb-8 text-xl md:text-3xl text-stone-700 font-semibold text-center">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Go to menu
        </Button>
      )}
    </div>
  );
}

export default Home;
