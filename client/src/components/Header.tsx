function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Website Name
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/SignUp">
                  Sign Up
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contact Us
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="tel:7323226832">
                      Call +(732) 322-6832
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="mailto:Company@companyEmail.com">
                      Email Us At: Company@companyEmail.com
                    </a>
                  </li>
                 
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
