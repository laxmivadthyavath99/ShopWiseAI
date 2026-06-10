function Navbar({
  setShowLogin,
  setShowRegister,
  user,
  setUser,
  wishlist,
  showWishlist,
  setShowWishlist,
  showCompareDashboard,
  setShowCompareDashboard
}){

  const logout = () => {

    localStorage.removeItem("user")

    setUser(null)

    window.location.reload()
  }

  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">

      <h1 className="text-3xl font-bold text-pink-500">
        ShopWiseAI
      </h1>

      <div className="flex gap-8 font-medium">
        <button
  onClick={() => {

    setShowCompareDashboard(false)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }}
  className="cursor-pointer"
>
  Home
</button>
        <button
  onClick={() =>
    setShowCompareDashboard(
      !showCompareDashboard
    )
  }
  className="cursor-pointer"
>
  Compare
</button>
        <button
  onClick={() => setShowWishlist(!showWishlist)}
  className="cursor-pointer"
>
  Wishlist ({wishlist.length})
</button>
      </div>

      {
        user ? (

          <div className="flex gap-4 items-center">

            <span>
              Hello, {user.username}
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="flex gap-4">

            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 border rounded-lg"
            >
              Login
            </button>

            <button
              onClick={() => setShowRegister(true)}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg"
            >
              Register
            </button>

          </div>

        )
      }

    </nav>
  )
}

export default Navbar