function Footer() {
  return (
    <>
      <footer className="flex justify-between bg-[var(--bgColor2)] backdrop-blur-[70px] px-10 pt-5 pb-5 text-[var(--textcolor)]">
        <div className="flex flex-col w-[360px]">
          <a href="" className="flex items-center gap-2 font-semibold">
            <img src="../src/assets/img/logo.png" alt="" />
            CheckScam
          </a>
          <div className="flex mb-6 py-6 border-b-[1px] font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <a href="https://github.com/m4l0n6">github/m4l0n6</a>
          </div>
          <p className="text-[var(--subTextColor)] text-sm">
            © 2025 Developed by m4l0n6. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <form action="" className="">
            <h2 className="font-bold text-lg">Contact with me</h2>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email"
              className="mr-4 mb-2 form__input"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
          <span className="text-[var(--subTextColor)] text-sm">
            mahonglonghg12@gmail.com
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
