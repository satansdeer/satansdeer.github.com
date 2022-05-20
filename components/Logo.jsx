export const Logo = ({ theme, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 171 32"
			{...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1="-4.6"
          x2="111.7"
          y1="15.1"
          y2="22.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="var(--tw-gradient-from)"
          />
          <stop
            offset="1"
            stopColor="var(--tw-gradient-to)"
          />
        </linearGradient>

        <linearGradient
          xlinkHref="#a"
          id="b"
          x1="-4.5"
          x2="111.8"
          y1="13.4"
          y2="21"
        />
        <linearGradient
          xlinkHref="#a"
          id="c"
          x1="-4.5"
          x2="111.9"
          y1="12.5"
          y2="20.1"
        />
        <linearGradient
          xlinkHref="#a"
          id="d"
          x1="-4.3"
          x2="112"
          y1="10"
          y2="17.6"
        />
        <linearGradient
          xlinkHref="#a"
          id="e"
          x1="-4"
          x2="112.4"
          y1="5.1"
          y2="12.7"
        />
        <linearGradient
          xlinkHref="#a"
          id="f"
          x1="-4.1"
          x2="112.2"
          y1="7.6"
          y2="15.1"
        />
      </defs>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path fill="url(#a)" d="M12.8 30.7H17L4.2 1.2H0l12.8 29.5z" />
          <path
            fill="url(#b)"
            d="M39.2 1.2 28.5 25.4 17.9 1.2h-4.6l13 29.5h4.2L43.4 1.2h-4.2z"
          />
          <path
            fill="url(#c)"
            d="M52.4 1.2 39.5 30.7h4.2L54.4 6.5 65 30.7h4.6l-13-29.5h-4.2z"
          />
          <path
            fill="url(#d)"
            d="M95.5 1.2h-4.3L80.6 25.4 69.9 1.2h-4.2l12.8 29.1.1.4h4.2l9.6-21.9 1.1-2.3 10.7 24.2h4.2L95.6 1.6l-.1-.4z"
          />
          <path
            fill="url(#e)"
            d="m166.5 1.2-10.7 24.2-10.7-24.2h-4.5l13 29.5h4.2l12.9-29.5h-4.2z"
          />
          <path
            fill="url(#f)"
            d="M124.8 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm0 28a12.1 12.1 0 1 1 12.1-12 12.1 12.1 0 0 1-12.1 12Z"
          />
        </g>
      </g>
    </svg>
  );
};
