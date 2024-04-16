 // Navbar For DashBoard ///////////////
 function Navbar({ search, dashboard }) {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    ///////////////
    function handleReturnHomeClick() {
      navigate("/");
    }

    /////////////////
    function handleReturnLoginClick() {
      navigate("/login");
    }

    ////////////////
    function handleGotoFolderPageClick() {
      navigate("/my-folders");
    }

    ////////////////
    function handleGotoDashboardPageClick() {
      navigate("/dashboard");
    }

    function handlesProfilePageClick() {
      navigate("/profile");
    }
    //////////////////////
    function CheckUser() {
      const [isAuthorized, setIsAuthorized] = useState(null);

      useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
      }, []);

      const auth = async () => {
        const token = localStorage.getItem("access");
        if (token) {
          setIsAuthorized(true);
        }
      };

      return isAuthorized ? (
        <a onClick={handleGotoDashboardPageClick} id="😀">
          Dashboard
        </a>
      ) : (
        <a onClick={handleReturnLoginClick} id="😀">
          Login
        </a>
      );
    }
    ////////////////////////////

}