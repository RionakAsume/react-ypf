import { Logoblanco} from "../assets/logo";
import { Link } from "react-router-dom";

function Header() {
    return (
      <header className="w-full">
     <Link to={'/main'} className="bg-custom-green w-full h-16 flex justify-center items-center py-7"> <Logoblanco /></Link></header>
    );
  }
  export default Header;
  