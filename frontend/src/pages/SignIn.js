import React from 'react';

function SignIn(props) {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    SignInWithGoogle,
  } = props;

  return (
    <div className="flex-col main_screen shadow-md mb-56 self-center text-2xl w-11/12 py-20 mt-20 min-w-max max-w-sm max-w-xl w-1200  min-h-700 max-h-full  items-center bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-700 p-10 rounded-md text-white hover:text-white-200">
      <section className="max-h-full px-10 justify-between">
        <div className="max-h-full">
          <label>Email </label>
          <input
            className="p-3 pr-40 w-full rounded-sm  mt-2 mb-4 flex text-gray-600 text-xl shadow-md"
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-blue-800 font-bold   ">{emailError}</p>
          <label>Password </label>
          <input
            className="p-3 pr-40 w-full rounded-sm mt-2 mb-4 flex text-gray-600 text-xl shadow-md"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{' '}
          <br />
          <p className="errorMsg">{passwordError}</p>
          <div className="btnContainer">
            {hasAccount ? ( // if the user has an account show this
              <>
                <button
                  onClick={handleLogin}
                  className="mb-6 bg-yellow-800 hover:bg-yellow-900 rounded-md pt-2 pb-3  p-1 w-1/2 flex items-center justify-center shadow-md"
                >
                  Log in
                </button>
                {/* <p class='text-md'>Have an account ? 
                     <span onClick={(e) => setHasAccount(!hasAccount)}>Register</span></p> */}
              </>
            ) : (
              // if user does not have an account then show this
              <>
                <button
                  onClick={handleSignup}
                  className="mb-6 bg-yellow-800 hover:bg-yellow-900 rounded-md pt-2 pb-3  p-1 w-1/2 flex items-center justify-center shadow-md"
                >
                  Register
                </button>
                <p className="text-sm mb-14">
                  Have an account?
                  <span
                    onClick={(e) => setHasAccount(!hasAccount)}
                    className="p-3 cursor-pointer text-xl shadow-sm rounded-md hover:shadow-md hover:bg-yellow-900 mx-2 mt-5 my-4"
                  >
                    {' '}
                    Log in
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <button
        onClick={SignInWithGoogle}
        className="min-h-6 px-10 py-4 rounded-md flex ml-10 bg-yellow-800 hover:bg-yellow-900 text-white shadow-md"
      >
        Sign In With Google
      </button>
      <br />
    </div>
  );
}

export default SignIn;
